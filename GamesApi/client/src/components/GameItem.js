import React, {useState} from "react";
import { Button,Container, Row, Col, Form, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const GameItem = props => {

    const baseURL = 'http://localhost:3001/api';
    const [isEditable, setIsEditable] = useState(false);
    const [gameName, setGameName] = useState(props.game.gameName);
    const [gamePrice, setGamePrice] = useState(props.game.gamePrice)

    const updateGame = async() => {

        const response = await fetch(baseURL + "/updateGame/" + props.game._id, {
            method: 'PUT',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                gameName: gameName,
                gamePrice: gamePrice,
                isAvailable: props.game.isAvailable,
                genreId: props.game.genreId,
                gameDescription: props.game.gameDescription,
                gameImage: props.game.gameImage
            })
          });
          const data = await response.json();
          setIsEditable(false);
          props.loadAllGames();
    }


    return (
       <>
        {
            isEditable ? (
                <>
                 <Card style={{marginTop:12,backgroundColor:'#9295AB',height:370,textAlign:'center',border:'none'}}>
                 <div style={{overflow:'hidden', width:'100%', height:150}}>
                        <Card.Img variant="top" src={props.game.gameImage} style={{height:'100%',width:'100%'}} />
                    </div>
                <Card.Body>

                    <Form.Control style={{height:40}} type="text" value={gameName} onChange={(e) => {setGameName(e.target.value)}} />
                    <Form.Control style={{height:40,marginTop:5}} type="text" value={gamePrice} onChange={(e) => {setGamePrice(e.target.value)}} />

                    <Container style={{marginTop:40}}>
                        <Row>
                            <Col>
                                <Button variant="info" onClick={() => setIsEditable(!isEditable)}>Back</Button>
                            </Col>
                            <Col>
                                <Button variant="success" onClick={updateGame}>Save</Button>
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>
                </Card>
                </>
            ) : (
                <>
                 <Card style={{marginTop:12,backgroundColor:'#9295AB',height:370,textAlign:'center',border:'none'}}>
                    <div style={{overflow:'hidden', width:'100%', height:150}}>
                        <Card.Img variant="top" src={props.game.gameImage} style={{height:'100%',width:'100%'}} />
                    </div>
                <Card.Body>
                    <div style={{height:55}}>
                    <Card.Title style={{fontSize:20,color:'#fff'}}>{props.game.gameName}</Card.Title>
                    </div>
                    <div style={{height:13}}>
                    <Card.Text style={{fontSize:18,color:'#000'}}>Genre: {props.game.genreId.genreName}</Card.Text>
                    </div>
                    <Card.Text style={{color:'#000',marginTop:5}}><b style={{fontSize:22}}>${props.game.gamePrice}</b></Card.Text>
                    <Container style={{marginTop:2}}>
                        <Row >
                            <Col>
                                <Button style={{background:'#53BABD',border:'none',width:70,height:30,fontSize:13}} onClick={() => setIsEditable(!isEditable)}>Edit</Button>
                            </Col>
                            </Row>
                            <Row>
                            <Col>
                                <Button style={{background:'#E44C4C',border:'none',width:70, height:30, marginTop:4,fontSize:13}} onClick={props.deleteGameClick}>Delete</Button>
                            </Col>
                        </Row>
                    </Container>
       
                </Card.Body>
                </Card>
                </>
            )
        }
       </>
    )
}

export default GameItem;