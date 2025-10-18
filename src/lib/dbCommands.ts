import clientPromise from '@/lib/connect';
import { ObjectId } from "mongodb";

interface FAQ {
  question: string;
  answer: string;
}

interface UserDocument {
  _id: ObjectId;
  username?: string;
  qna: FAQ[];
}

export async function checkUsername(username: string) {
  if (!username) return null;
  const client = await clientPromise;
  const db = client.db("application");
  const collection = db.collection("users");
  const user = await collection.findOne({ username });
  return user?._id ?? null;
}

export async function addQuestionAnswer(_id: string, question: string, answer: string) {
  if (!_id || !question || !answer) {
    console.log("addQuestionAnswer: Missing required fields");
    return null;
  }
  try {
    const client = await clientPromise;
    const db = client.db("application");
    const collection = db.collection<UserDocument>("users");
    const result = await collection.updateOne(
      { _id: new ObjectId(_id) },
      {
        $push: { qna: { question, answer } }
      },
      { upsert: true }
    );
    console.log("addQuestionAnswer result:", result);
    if (result.upsertedId) {
      console.log(`Created new user with _id: ${result.upsertedId}`);
    } else if (result.modifiedCount > 0) {
      console.log(`Updated QnA for user ${_id}`);
    }
    return result.acknowledged;
  } catch (error) {
    console.error("Error in addQuestionAnswer:", error);
    return false;
  }
}

export async function removeQuestion(_id: string, question: string) {
  if (!_id || !question) {
    console.log("removeQuestion: Missing required fields");
    return null;
  }
  try {
    const client = await clientPromise;
    const db = client.db("application");
    const collection = db.collection<UserDocument>("users");

    const result = await collection.updateOne(
      { _id: new ObjectId(_id) },
      { $pull: { qna: { question: question } } }
    );
    console.log("removeQuestion result:", result);
    if (result.modifiedCount > 0) {
      console.log(`Removed question \"${question}\" for user ${_id}`);
      return true;
    } else {
      console.log(`No matching question found for user ${_id}`);
      return false;
    }
  } catch (error) {
    console.error("Error in removeQuestion:", error);
    return false;
  }
}

export async function viewAllQuestionsAndAnswers(_id: string) {
  if (!_id) return null;

  const client = await clientPromise;
  const db = client.db("application");
  const collection = db.collection("users");

  const user = await collection.findOne(
    { _id: new ObjectId(_id) },
    { projection: { qna: 1, _id: 0 } } // only return qna field
  );

  return user?.qna || [];
}
