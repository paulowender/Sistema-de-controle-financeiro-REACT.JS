/**
 * Firebase Repository
 *
 * @author Paulo Wender
 * @version 1.1.0
 * @since 2023-11-27
 *
 * @description
 *
 * Class to handle Firebase operations *
 */

import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, limit, onSnapshot, orderBy, query, setDoc, where } from "firebase/firestore";
import { FirestoreRef } from "./firebase";

export class FirebaseRepository {
  constructor() {
    this.db = FirestoreRef
  }
  /**
   * Retrieves a collection of documents from Firestore based on the specified path,
   * callback, and optional parameters.
   *
   * @param {string} path - The path to the collection in Firestore.
   * @param {function} callback - The callback function to be executed with the retrieved data.
   * @param {function} [onError] - The optional error callback function.
   * @param {string} [orderBy] - The field to order the documents by.
   * @param {string} [order="asc"] - The order in which to sort the documents. Default is "asc".
   * @param {Array<Array<any>>} [where] - The optional array of where clauses to filter the documents.
   * @param {number} [limit] - The optional limit on the number of documents to retrieve.
   * @return {Promise<void>} - A promise that resolves when the data is retrieved successfully.
   */
  async getCollection(path, callback, onError, orderByField, order = 'asc', whereClauses, limitValue) {
    if (!path) throw new Error('Path is required');
    if (!callback) throw new Error('Callback is required');

    let ref = collection(this.db, path);

    if (orderByField) {
      ref = query(ref, orderBy(orderByField, order));
    }

    if (limitValue && !isNaN(limitValue)) {
      ref = query(ref, limit(limitValue));
    }

    if (whereClauses) {
      whereClauses.forEach(w => {
        ref = query(ref, where(w[0], w[1], w[2]));
      });
    }

    try {
      const querySnapshot = await getDocs(ref);
      const data = querySnapshot.docs.map(doc => doc.data());
      callback(data);
    } catch (err) {
      console.log('Error on getCollection', err);
      if (onError) onError(err);
    }
  }

  getDocs = (path, whereClauses, orderByField, order = 'asc', limitValue) => {
    if (!path) throw new Error('Path is required');

    let ref = collection(this.db, path);

    if (orderByField) {
      ref = query(ref, orderBy(orderByField, order));
    }

    if (limitValue && !isNaN(limitValue)) {
      ref = query(ref, limit(limitValue));
    }

    if (whereClauses) {
      whereClauses.forEach(w => {
        ref = query(ref, where(w[0], w[1], w[2]));
      });
    }

    return new Promise(async (resolve, reject) => {
      try {
        const querySnapshot = await getDocs(ref);
        const data = querySnapshot.docs.map(doc => doc.data());
        resolve(data);
      } catch (err) {
        console.log('Error on getDocs', err);
        reject(err);
      }
    });
  }
  /**
   * Retrieves a document from Firestore and calls the provided callback with the document data.
   *
   * @param {string} pathToDoc - The path to the document in Firestore.
   * @param {function} callback - The callback function to be called with the document data.
   * @param {function} onError - The error callback function to be called if an error occurs.
   * @return {Promise<void>} A promise that resolves when the document is retrieved successfully.
   */
  async getDoc(pathToDoc, callback, onError) {
    if (!pathToDoc) throw new Error('PathToDoc is required');

    const ref = doc(this.db, pathToDoc);

    try {
      const docSnap = await getDoc(ref);
      const data = docSnap.data();
      if (callback) callback(data);
      return data;
    } catch (err) {
      console.log('Error on getDoc', err);
      if (onError) onError(err);
    }
  }

  /**
   * Listen for changes in a Firestore collection and invoke the callback with the updated data.
   *
   * @param {string} path - The path of the Firestore collection to listen to.
   * @param {Function} callback - The callback function to be executed with the updated data.
   * @param {Function} onError - The error handling function.
   * @param {Array} where - An array of conditions to filter the collection data.
   * @param {string} [orderBy="timestamp"] - The field to order the collection by, defaults to "timestamp".
   * @param {string} [order="asc"] - The order to sort the collection, defaults to "asc".
   * @param {number} limit - The maximum number of documents to query from the collection.
   * @return {Function} - The unsubscribe function
   */
  listenCollection(path, callback, onError, whereClauses, orderByField = 'timestamp', order = 'asc', limitValue) {
    if (!path) throw new Error('Path is required');
    if (!callback) throw new Error('Callback is required');

    let ref = collection(this.db, path);

    if (orderByField) {
      ref = query(ref, orderBy(orderByField, order));
    }

    if (limitValue && !isNaN(limitValue)) {
      ref = query(ref, limit(limitValue));
    }

    if (whereClauses) {
      whereClauses.forEach(w => {
        ref = query(ref, where(w[0], w[1], w[2]));
      });
    }

    return onSnapshot(ref, querySnapshot => {
      const data = querySnapshot.docs.map(doc => doc.data());
      callback(data);
    }, err => {
      console.log('Error on listenCollection', err);
      if (onError) onError(err);
    });
  }

  /**
   * Listens to a document at the specified path and invokes the callback function
   * whenever the document changes. If an error occurs, the onError function is called.
   *
   * @param {string} path - The path of the document to listen to.
   * @param {function} callback - The callback function to invoke when the document changes.
   *                             It will receive the updated data as an argument.
   * @param {function} onError - An optional error callback function to invoke if an error occurs.
   *                             It will receive the error object as an argument.
   * @throws {Error} If the path or callback is not provided.
   * @returns {Function} - The unsubscribe function.
   */
  listenDoc(path, callback, onError) {
    if (!path) throw new Error('Path is required');
    if (!callback) throw new Error('Callback is required');

    const ref = doc(this.db, path);

    return onSnapshot(ref, docSnap => {
      callback(docSnap.data());
    }, err => {
      console.log('Error on listenDoc', err);
      if (onError) onError(err);
    });
  }

  /**
   * Checks if a document exists at the given path.
   *
   * @param {string} path - The path to the document.
   * @return {Promise<boolean>} A promise that resolves to a boolean indicating whether the document exists.
   */
  async docExists(path) {
    const ref = doc(this.db, path);
    const docSnap = await getDoc(ref);
    return docSnap.exists();
  }

  /**
   * Counts the number of documents in the specified collection.
   * @param {string} path - The path of the collection to count.
   * @return {Promise<number>} A promise that resolves to the number of documents in the collection.
   * @throws {Error} If the path is not provided.
   *
   * @example
   * const count = await repository.count('users')
   * */
  async count(path, whereClauses) {
    let ref = collection(this.db, path);

    if (whereClauses) {
      whereClauses.forEach(w => {
        ref = query(ref, where(w[0], w[1], w[2]));
      });
    }

    const querySnapshot = await getDocs(ref);
    return querySnapshot.size;
  }

  /**
   * Listen count
   * @param {string} path - The path of the collection to count.
   * @param {Array} where - An array of conditions to filter the collection data.
   * @return {Promise<number>} A promise that resolves to the number of documents in the collection.
   * @throws {Error} If the path is not provided.
   * @example
   * const count = await repository.listenCount('users')
   *
   * */
  listenCount(path, callback, onError, whereClauses, limitValue) {
    if (!path) throw new Error('Path is required');
    if (!callback) throw new Error('Callback is required');

    let ref = collection(this.db, path);

    if (limitValue && !isNaN(limitValue)) {
      ref = query(ref, limit(limitValue));
    }

    if (whereClauses) {
      whereClauses.forEach(w => {
        ref = query(ref, where(w[0], w[1], w[2]));
      });
    }

    return onSnapshot(ref, querySnapshot => {
      const data = querySnapshot.size;
      callback(data);
    }, err => {
      console.log('Error on listenCount', err);
      if (onError) onError(err);
    });
  }


  /**
   * Checks if a collection exists at the specified path.
   *
   * @param {string} path - The path of the collection to check.
   * @return {Promise<boolean>} A Promise that resolves to a boolean indicating if the collection exists.
   */
  async collectionExists(path) {
    const ref = collection(this.db, path);
    const querySnapshot = await getDocs(ref);
    return querySnapshot.size > 0;
  }

  /**
   * Asynchronously adds a document to the Firestore database.
   *
   * @param {string} path - The path of the document in Firestore.
   * @param {Object} data - The data to be added to the document.
   * @return {Promise<DocumentReference>} A promise that resolves with the
   * reference to the added document.
   */
  async addDoc(path, data) {
    const ref = collection(this.db, path);
    return addDoc(ref, data);
  }

  /**
   * Asynchronously sets a collection in Firestore with the given data.
   *
   * @param {string} path - The path of the collection in Firestore.
   * @param {Object} data - The data to be added to the collection.
   * @return {Promise<DocumentReference>} A promise that resolves with the
   * reference to the added document.
   */
  async setCollection(path, data) {
    const ref = collection(this.db, path);
    return addDoc(ref, data);
  }

  /**
   * Sets the data at the specified path in the Firestore database.
   *
   * @param {string} path - The path where the data should be set.
   * @param {any} data - The data to be set.
   * @return {Promise<void>} A promise that resolves when the data is successfully set.
   */
  async setDoc(path, data) {
    const ref = doc(this.db, path);
    return setDoc(ref, data, { merge: true });
  }

  /**
   * Deletes the document at the specified path in the Firestore database.
   *
   * @param {string} path - The path of the document to delete.
   * @return {Promise<void>} A promise that resolves when the document is successfully deleted.
   */
  async deleteDoc(path) {
    const ref = doc(this.db, path);
    return deleteDoc(ref);
  }

  async deleteDocWhere(path, whereClauses) {
    let ref = collection(this.db, path);

    if (whereClauses) {
      whereClauses.forEach(w => {
        ref = query(ref, where(w[0], w[1], w[2]));
      });
    }

    const querySnapshot = await getDocs(ref);
    const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
    return Promise.all(deletePromises);
  }
}
