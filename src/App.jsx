import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import DataTable from 'react-data-table-component';

function App() {
  const columns = [
    {
      name: 'Nombre',
      selector: row => row.nombre,
      sortable: true,
    },
    {
      name: 'Apellido',
      selector: row => row.apellido,
      sortable: true,
    },
    {
      name: 'Edad',
      selector: row => row.edad,
      sortable: true,
    },
  ];

  const data = [
    {
      nombre: 'Juan',
      apellido: 'Perez',
      edad: 25,
    },
    {
      nombre: 'Maria',
      apellido: 'Lopez',
      edad: 30,
    },
    {
      nombre: 'Carlos',
      apellido: 'Gomez',
      edad: 25,
    },
    {
      nombre: 'Ana',
      apellido: 'Martinez',
      edad: 28,
    },
    {
      nombre: 'Felipe',
      apellido: 'Vega',
      edad: 35,
    },
  ];

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRecords(data);
      setLoading(false);
    }, 2_000);

    return () => clearTimeout(timeout);
  }, []);

  const handleChange = e => {
    const filteredRecords = data.filter(record => {
      return record.nombre.toLowerCase().includes(e.target.value.toLowerCase());
    });

    setRecords(filteredRecords);
  };

  const Loader = () => {
    return (
      <div>
        <h1>Cargando NIA MIAU</h1>
        <h3>Spinner</h3>
      </div>
    );
  };

  return (
    <div>
      <input type='text' onChange={handleChange} />

      <DataTable
        title={'Datos de Usuario'}
        columns={columns}
        data={records}
        selectableRows={true}
        pagination
        paginationPerPage={4}
        onSelectedRowsChange={data => console.log(data)}
        fixedHeader
        progressPending={loading}
        progressComponent={<Loader />}
      />
    </div>
  );
}

export default App;
