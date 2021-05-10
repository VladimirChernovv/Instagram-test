import {firebase, FieldValue} from '../lib/firebase';

export async function doesUserNameExist(userName) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('userName', '==', userName)
    .get();
 
  console.log(result);

  return result.docs.map((user) => user.data().length > 0);
};