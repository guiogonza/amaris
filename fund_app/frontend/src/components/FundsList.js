import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, ListGroup } from 'react-bootstrap';
import log from 'loglevel';

log.setLevel('debug');

const FundsList = () => {
  const [funds, setFunds] = useState([]);

  useEffect(() => {
    const fetchFunds = async () => {
      try {
        const response = await axios.get('http://localhost:5000/funds');
        log.debug('Funds data:', response.data);  // Verifica la estructura de los datos aquí
        setFunds(response.data);
      } catch (error) {
        log.error('Error fetching funds:', error);
      }
    };

    fetchFunds();
  }, []);

  return (
    <Container>
      <h2>Fondos Disponibles</h2>
      <ListGroup>
        {funds.map((fund) => (
          <ListGroup.Item key={fund.Id}>
            <strong>{fund.Nombre}</strong><br />
            Monto Mínimo: {fund.MontoMinimo} <br />
            Categoría: {fund.Categoria}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default FundsList;