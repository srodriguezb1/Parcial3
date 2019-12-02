import React, { Component } from 'react';
import {Table, Navbar, Row,Col} from 'react-bootstrap';
import PeliculaList from './peliculaList';
import Chart from './chart';
import Pelicula from './pelicula';
import { FormattedDate, FormattedNumber, FormattedPlural, FormattedMessage } from 'react-intl';
import *  as d3 from 'd3';

class ListPeliculas extends Component {

    state = {
        list :[],
        selected: null,
    }

    componentDidMount() {
        if (!navigator.onLine) {
            if (localStorage.getItem('peliculas') === null)
                this.setState({ peliculas: "loading..." })
            else
                this.setState({ list: localStorage.getItem('peliculas') });
        }
        console.log(this.props.idm)
        var link=".";
        if(this.props.idm ==="es"){
            link= "https://gist.githubusercontent.com/josejbocanegra/f784b189117d214578ac2358eb0a01d7/raw/2b22960c3f203bdf4fac44cc7e3849689218b8c0/data-es.json"
          }
          else if(this.props.idm ==="en") {
            link = "https://gist.githubusercontent.com/josejbocanegra/8b436480129d2cb8d81196050d485c56/raw/48cc65480675bf8b144d89ecb8bcd663b05e1db0/data-en.json";
          }
          console.log(link)
        fetch(link)
          .then(res => {
              return res.json();
          }).then(res => {
              this.setState({ list: res });
              localStorage.setItem('list', res);
              this.drawChart();
          });

          
        }


    seleccionada= (pel)=>{
        this.setState({
            selected : pel
        })
    }

    getPlural(bud){
		if(bud ===1){
			return <FormattedMessage id="mill"/>
		}
		else {
			return <FormattedMessage id="millions"/>
		}
	}

    mostrarDetalle(){
        
        
        if(this.state.selected !== null){
            console.log(this.state.selected.poster)
            return <Pelicula value ={this.state.selected}></Pelicula>
        }
    }

    mostrarLista(){
        return this.state.list.map( (e) =>{ return (
        <tr onClick={()=>this.seleccionada(e)}>
            <td>
                {e.id}
            </td>
            <td>
                {e.name}
            </td>
            <td>
                {e.directedBy}
            </td>
            <td>
                {e.country}
            </td>
            <td>
                {e.budget} <FormattedPlural value={e.budget} one={this.getPlural(e.budget)} other={this.getPlural(e.budget)}></FormattedPlural>
            </td>
            <td>
            <FormattedDate
            value={new Date(e.releaseDate)}
            year='numeric'
            month='long'
            day='numeric'
            weekday='long'
        />
            </td>
            <td>
            <FormattedNumber value={e.views} />
    </td></tr>)
        })
                
    }

    drawChart(){
        const canvas = d3.select(this.refs.canvas);
        const data = this.state.list;
    
        const width = 700;
        const height = 500;
        const margin = { top:10, left:50, bottom: 40, right: 10};
        const iwidth = width - margin.left - margin.right;
        const iheight = height - margin.top -margin.bottom;
    
        const svg = canvas.append("svg");
        svg.attr("width", width);
        svg.attr("height", height);
        console.log(this.state.list);
        let g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
    
        const y = d3.scaleLinear() 
            .domain([0, 10000000])
            .range([iheight, 0]);
    
        const x = d3.scaleBand()
        .domain(this.state.list.map(d => d.name) ) 
        .range([0, iwidth])
        .padding(0.1); 
    
        const bars = g.selectAll("rect").data(this.state.list);
    
        bars.enter().append("rect")
        .attr("class", "bar")
        .style("fill", "steelblue")
        .attr("x", d => x(d.name))
        .attr("y", d => y(d.views))
        .attr("height", d => iheight - y(d.views))
        .attr("width", x.bandwidth())  
    
        g.append("g")
        .classed("x--axis", true)
        .call(d3.axisBottom(x))
        .attr("transform", `translate(0, ${iheight})`);  
    
        g.append("g")
        .classed("y--axis", true)
        .call(d3.axisLeft(y));
        }
    

    render() {
        return (
            <div>
                <Navbar className="navbar navbar-custom">
                <Navbar.Brand href="#home">Movies</Navbar.Brand>
  
                </Navbar>
                <Row>
                    <Col>
                <Table striped bordered hover>
                    
                <thead>
                    <tr>
                    <th>#</th>
                    <th><FormattedMessage id ="Nombre"></FormattedMessage></th>
                    <th><FormattedMessage id ="Director"></FormattedMessage></th>
                    <th><FormattedMessage id ="Pais"></FormattedMessage></th>
                    <th><FormattedMessage id ="Presupuesto"></FormattedMessage></th>
                    <th><FormattedMessage id ="Estreno"></FormattedMessage></th>
                    <th><FormattedMessage id ="Views"></FormattedMessage></th>
                    </tr>
                </thead>
                <tbody>
                    {this.mostrarLista()}    
                </tbody>
                </Table>
                </Col>
                <Col>
                    {this.mostrarDetalle()}
                </Col>
                </Row>
                <Row>
                <div>
                <div ref ="canvas"></div>
                </div>
                </Row>
            </div>
        );
    }
}

export default ListPeliculas;