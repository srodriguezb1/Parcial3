import React, { Component } from 'react';
import { FormattedDate, FormattedNumber, FormattedPlural, FormattedMessage } from 'react-intl';

class PeliculaList extends Component {
    getPlural(){
		if(this.props.value.budget ===1){
			return <FormattedMessage id="mill"/>
		}
		else {
			return <FormattedMessage id="millions"/>
		}
	}

    render() {
        return (
            
                <div>
                        <td>
                            {this.props.value.id}
                        </td>
                        <td>
                            {this.props.value.name}
                        </td>
                        <td>
                            {this.props.value.directedBy}
                        </td>
                        <td>
                            {this.props.value.country}
                        </td>
                        <td>
                            {this.props.value.budget} <FormattedPlural value={this.props.value.budget} one={this.getPlural()} other={this.getPlural()}></FormattedPlural>
                        </td>
                        <td>
                        <FormattedDate
						value={new Date(this.props.value.releaseDate)}
						year='numeric'
						month='long'
						day='numeric'
						weekday='long'
					/>
                        </td>
                        <td>
                        <FormattedNumber value={this.props.value.views} />
                        </td>
                        </div>
           
        );
    }
}

export default PeliculaList;