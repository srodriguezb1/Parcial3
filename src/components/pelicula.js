import React, { Component } from 'react';
import {Card} from 'react-bootstrap';

class Pelicula extends Component {
    state = {
        name: this.props.value.name,
        descripcion: this.props.value.description,
        image: this.props.value.poster,
        cast:this.props.value.cast
    }
    render() {
        return (
            <div>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={this.state.image} />
                    <Card.Body>
                    <Card.Title>{this.state.name}</Card.Title>
                        <Card.Text>
                        {this.state.descripcion}
                        </Card.Text>
                        <Card.Text>
                        Cast : {this.state.cast}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default Pelicula;