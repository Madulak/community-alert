import { firebase } from '../../firebase';

export const CREATE_POST = 'CREATE_POST';
export const SELECT_LOCATION = 'SELECT_LOCATION';
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const LOADING = 'LOADING';
export const UPLOADED_POST = 'UPLOADED_POST';
export const ADD_TO_FOUND = 'ADD_TO_FOUND';

export const create_post = (data) => {

    return async (dispatch, getState) => {
        const user = getState().user.user;
        // console.log('[USER] ',user);
        // console.log('[DATA] ' , data)

        const image = data.image;
        const imageName = data.image.split('/').pop();
        // console.log('[IMAGE_NAME] ', imageName);

        const response = await fetch(image);
        const blob = await response.blob()
        // console.log('[BLOB] ',blob)

        const uploadTask2 = firebase.storage().ref(`images/${imageName}`).put(blob);

        uploadTask2.on("state_changed", 
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100 )
                console.log(progress);
                // dispatch({ type: Loading, progress: true})
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
                        uploadedBy: user,
                        place: data.place
                    })
                    console.log('{VIDEO_UPLOAD..DONE}!!');
                    // dispatch({ type: Loading, progress: false})
                })
                .catch(error => {
                    console.log(' [ ERROR ] ',error);
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

export const loading = (loading) => {
    
    return dispatch => {

        dispatch({type: 'LOADING', loading: loading})
    }
}

export const uploaded_post = (posts) => {

    return dispatch => {

        dispatch({ type: UPLOADED_POST, uploadedPost: posts})
    }
}

export const add_to_found = (post) => {

    return async (dispatch, getState) => {
        const user = getState().user.user.username;
        firebase.firestore().collection('found').add(post).catch(error => console.log(error));
        firebase.firestore().collection('posts').doc(post.id).delete().then(() => console.log('Deleted!!!')).catch(e => console.log(e));
        dispatch({type: ADD_TO_FOUND})
    }
}

