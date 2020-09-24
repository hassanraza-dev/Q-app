import  firebase from '../../../config/firebase'
function setCompany() {
    return (dispatch) => {
        firebase.firestore().collection('Companies').get()
        .then((response) => {
            const list = []
            response.forEach(doc => {
                list.push(doc.data())
                
            })
            console.log('listttt***',list)
            dispatch({
                type: 'SET_COMPANY',
                data: list
            })
        })   
    }}

export
{
   setCompany
}