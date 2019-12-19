import React from 'react';
import PassengerCard from './PassengerCard';

import './styles/cardList.css';

class PassengerList extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            loading: false,
            error: null,
            passengers: []
        }
    }
    
    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        this.setState({ loading: false });
        try {
            fetch('http://localhost:8080/api/pasajeros')
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    this.setState({ loading: false, passengers: data })
                });
        } catch (error) {
            this.setState({ loading:false, error: error })
        }
    }

    render() {
        return (
            <div className="CardList_container">
                <ul className="unstyled-list">
                    {
                        this.state.passengers.map( (passenger) => {
                            return(
                                <li key={passenger.id}>
                                    <PassengerCard fullName={passenger.nombre} address={passenger.direccion_residencia} birthday={passenger.fecha_nacimiento} />
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default PassengerList;