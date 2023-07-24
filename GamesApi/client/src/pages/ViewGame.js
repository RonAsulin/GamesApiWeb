import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Form, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaShoppingCart } from 'react-icons/fa';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";

export default function ViewGame(props) {
  const location = useLocation();
  const { gameName, gamePrice, genreName, gameDescription, gameImage, gameId } = location.state;
  const baseURL = "http://localhost:3001/api";
  const [newComment, setNewComment] = useState("");
  const [allComments, setAllComments] = useState([]);



  const addCart = () => {
    const cartItem = {
      id: Math.random().toString(36).substr(2, 9),
      gameName: gameName,
      gamePrice: gamePrice,
      gameImage: gameImage
    };

    const cartItemsFromStorage = JSON.parse(localStorage.getItem("cartItems")) || [];
    const updatedCartItems = [...cartItemsFromStorage, cartItem];
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

    toast.success(gameName + " Added To Cart");

  }
  const fetchComments = () => {
    axios.get(baseURL + '/account/comments', { params: { gameId: gameId } })
      .then((response) => {
        setAllComments(response.data);
        console.log(response + " response");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    console.log('=>'+ allComments)
    fetchComments();
    
  }, []);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      axios
        .post(baseURL + "/account/createComment", {
          gameId: gameId,
          content: newComment,
        })

        .then((response) => {
          const newCommentData = response.data.data;
          setAllComments([...allComments, newCommentData]);
          setNewComment("");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <>
      <ToastContainer />
      <Header />
      <div style={{ background: "#282c34" }}>
        <Container>
          <Row>
          <Col lg={12} xs={12}>
              <Card className="p-4 mb-4" style={{ background: "#595E69", color: "#fff",marginBottom:10 }}>
                <div className="text-center">
                  <img src={gameImage} alt="Game Image" className="img-fluid" style={{ width: 700, height:400 ,borderRadius:10}} />   
                </div>                
                <Button variant="primary" style={{ marginLeft: 3, width:50 }} onClick={addCart} >
                  <FaShoppingCart />
                  </Button>
              </Card>
              </Col>


            <Col lg={12} xs={12}>
              <Card className="p-4 mb-4" style={{ background: "#595E69", color: "#fff" }}>
                <h1 className="text-center mb-5">Game Details</h1>

                <Row style={{backgroundColor:'#4B505A',padding:25,borderRadius:5 }}>
                <Col lg={2} xs={12}>
                </Col>

                <Col lg={3} xs={12}>
                  <h5 className="font-weight-bold" style={{fontSize:30}}>Game Name:</h5>
                  <p style={{fontSize:18}}>{gameName}</p>
                  </Col>

                  <Col lg={3} xs={12}>
                  <h5 className="font-weight-bold" style={{fontSize:30}}>Price:</h5>
                  <p style={{fontSize:18}}>${gamePrice}</p>                 
                </Col>

                <Col lg={3} xs={12}>
                  <h5 className="font-weight-bold" style={{fontSize:30}}>Genre:</h5>
                  <p style={{fontSize:18}}>{genreName}</p>
                  </Col>
                  </Row>


                  <Row style={{backgroundColor:'#4B505A',padding:25,borderRadius:5 }}>
                  <Col lg={2} xs={12}></Col>
                  <Col lg={9} xs={12} style={{display:'flex',marginTop:10}}>
                  <div>
                  <h5 className="font-weight-bold" style={{fontSize:28}}>Description:</h5>
                  <p style={{ maxHeight: "150px", overflowY: "auto",marginLeft:20}}>{gameDescription}</p>
                  </div>
                </Col>
                </Row>
              </Card>
            </Col>

              <Col lg={12} xs={12}>
              <Card className="p-4 mb-4" style={{ background: "#595E69", color: "#fff"}}>
                <Row>
                <Col lg={5} xs={12}>
                  </Col>

                  <Col lg={7} xs={12}>
                <h2 className="mb-4">Comments</h2>
                </Col>
                </Row>

                <Row style={{backgroundColor:'#4B505A',padding:25,borderRadius:5 }}>
               
                <Col lg={6} xs={12}>
                {allComments.length > 0 ? (
                  allComments.map((comment, index) => (
                    <div key={index} className="mb-4" style={{backgroundColor:'#bebebebe',borderRadius:5,padding:10}}>
                     <label style={{fontSize:25}}>Date: </label> <label style={{fontSize:18,marginLeft:8}}>{comment.date}</label>                 
                      <h5 style={{fontSize:20}}>Comment:</h5>
                      <p>{comment.content}</p>
                    </div>
                  ))
                ) : (
                  <p>No comments yet</p>
                )}
                </Col>
                <Col lg={6} xs={12}>
                <Form.Group controlId="commentForm">
                  <Form.Label>Add a comment</Form.Label>
                  <Form.Control style={{backgroundColor:'#CDCED6'}} as="textarea" rows={3} value={newComment} onChange={handleCommentChange} />
                </Form.Group>
                <Button variant="primary" onClick={handleAddComment} style={{marginTop:7,marginLeft:435,width:150}}>
                  Add Comment
                </Button>
                </Col>

              </Row>
              </Card>
              </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
