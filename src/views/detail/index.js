import React,{useState,useEffect} from 'react'
import { useHistory } from "react-router-dom";
import { Modal , Button ,Form} from 'react-bootstrap'
import ModalHeader from 'react-bootstrap/esm/ModalHeader'
import {addToken} from '../../config/firebase'
import  firebase from '../../config/firebase'
import {  useParams } from "react-router-dom";
import './index.css'
import Customer from '../customer';


const Detail = ()=>
{
  useEffect(()=>{
    
    getSingleCompany()
    getCustomer()

    
  },[])

 

  let today = new Date();

  let {slug} = useParams();

 

  
  const [company,setCompany] = useState()
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [token, setToken] = useState();    
  const [time, setTime] = useState('');   
  
  const [customer,setCustom] = useState()

  const [customerLength,setCustomerLength] = useState()
  
  const currentTime = today.getDate()


     const getCustomer = ()=>
     {
       firebase.firestore().collection('Customer')
       .where('id','==',slug)
       .get()
       .then(res => {
        const list = []
         res.forEach(doc => {
          const customer = doc.data()
           console.log('customer==========>',doc.data())

           list.push(customer)
           
         })
         setCustom(list)
           setCustomerLength(list.length)
         
       
       })
       
     }
     console.log('customer==========>',customerLength)
  
 
  


      
    function getSingleCompany() {
    
      var docRef = firebase.firestore().collection("Companies").doc(slug);

      docRef.get().then(function(doc) {
          if (doc.exists) {
              console.log("Document data:", doc.data());
              setCompany(doc.data())
          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
          }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });

    }

  if(!company){
    return <h1 style={{color:'white'}}>Loading...</h1>
  }

   

    const handleClose = () => setShow(false);
    const handleClose1 = () => setShow1(false);
    const handleShow = () => setShow(true);  
    const handleShow1 = () => setShow1(true);  

    const onAddToken = ()=>
    {
      
      
        addToken(token,time,slug,currentTime)
    }
   
    
      if(company.regtime !== currentTime)
      {
        firebase.firestore().collection('Companies').doc(slug).update({
          token:'0'
        }).then(()=>{
          console.log("reset Successfuly")
        })
      }
    
    
    
    return(
        <>
        <Modal
          show={show}
          onHide={handleClose}
          style={{opacity:"1"}}
        >
          <ModalHeader>

          <Modal.Title>Add Company</Modal.Title>
          </ModalHeader>

          <Modal.Body>

            <Form >
              <Form.Group>

            <Form.Label>Number Of tokens</Form.Label>

            <Form.Control type="number" onChange={e=>setToken(e.target.value)} ></Form.Control>

              </Form.Group>

              <Form.Group>

            <Form.Label>Time of each turn</Form.Label>

            <Form.Control type="text" onChange={e=>setTime(e.target.value)} required></Form.Control>

              </Form.Group>  
            </Form>

          </Modal.Body>

          <Modal.Footer>

            <Button variant="secondary" onClick={handleClose}>Close</Button>
            <Button variant="success" onClick={onAddToken}>Add</Button>
          </Modal.Footer>
</Modal>
<Modal
          show={show1}
          onHide={handleClose1}
          style={{opacity:"1"}}
        >
          <ModalHeader>

          <Modal.Title>Add Company</Modal.Title>
          </ModalHeader>

          <Modal.Body>

           {customer && customer.map(items => {
             return <div style={{background:'red'}}>
                        <div>{items.name}</div> 
                         <div>{items.email}</div>
                         <img src={items.url} style={{width:"100px",height:'100px'}}/>
                    </div>
           })}

          </Modal.Body>

          <Modal.Footer>

            <Button variant="secondary" onClick={handleClose1}>Close</Button>
            
          </Modal.Footer>
</Modal>
        <h1 style={{textAlign:'center',color:'white',fontSize:'60px'}}>Detail</h1>
        
        <div className='detail_box'>
            
            
           <h1>Tokens:<span style={{color:'yellowgreen',fontSize:'50px'}}>{company.token}</span></h1>
           <h1>Sold:<span style={{color:'yellowgreen',fontSize:'50px'}}>{customerLength}<button onClick={handleShow1} className="btn btn-warning">See Customer</button></span></h1>
           
        <div style={{display:'flex',justifyContent:'flex-end',alignSelf:"flex-end"}}>

   <div style={{marginTop:'10px'}} className='detailBox'>
    <h2>Name:</h2><h2>{company.name}</h2>
    <h2>Since:</h2><h2>{company.since}</h2>
    <h2>Timing:</h2><h2>{company.timing}</h2>
    <h2>Address:</h2><h2>{company.address}</h2>
   </div>

   

        <div className='condetail' onClick={handleShow} >
          <h1>Add Tokens</h1>
        </div>
        </div>
  
        </div>

        </>
    )
}

export default Detail