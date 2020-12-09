import { firebase } from '../../firebase';

export const CREATE_POST = 'CREATE_POST';
export const SELECT_LOCATION = 'SELECT_LOCATION';
export const CREATE_COMMENT = 'CREATE_COMMENT';

export const create_post = (data) => {

    return async (dispatch, getState) => {
        const user = getState().user.user;
        console.log('[USER] ',user);
        console.log('[DATA] ' , data)

        const image = data.image;
        const imageName = data.image.split('/').pop();
        console.log('[IMAGE_NAME] ', imageName);

        const response = await fetch(image);
        const blob = await response.blob()
        console.log('[BLOB] ',blob)

        const uploadTask2 = firebase.storage().ref(`images/${imageName}`).put(blob);

        uploadTask2.on("state_changed", 
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100 )
                console.log(progress);
                // dispatch({ type: PROGRESS, progress: progress})
            },
            (error) => {
                console.log(error);
            },
            () => {
                firebase.storage().ref("images")
                .child(imageName)
                .getDownloadURL()
                .then(url => {
                    console.log(url);
                     firebase.firestore().collection('posts').add({
                        title: data.title,
                        description: data.description,
                        image: url,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        timeDate: data.timeDate,
                        location: data.location,
                        picker: data.picker,
                        uploadedBy: user
                    })
                    console.log('{VIDEO_UPLOAD..DONE}!!');
                })
                .catch(error => {
                    console.log(error);
                })
            })


        dispatch({  type: CREATE_POST })
    }
}

export const select_location = (data) => {

    return dispatch => {

        dispatch({type: SELECT_LOCATION, location: data})
    }
}

export const create_comment = (data) => {

    return async (dispatch, getState) => {
        const user = getState().user.user.username;
        const id = data.id;
        const comment = data.comment;

        firebase.firestore().collection('posts').doc(id).collection('comments').add({
            comment: comment,
            commentBy: user,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })

        dispatch({ type: CREATE_COMMENT })
    }
}