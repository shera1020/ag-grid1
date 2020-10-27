
import React, { useState,useEffect } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';


const App = () => {
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);

    const [rowData, setRowData] = useState([]);

    //onGridReady={ params => setGridApi(params.api) } 
    
    const onButtonClick = e => {
        const selectedNodes = gridApi.getSelectedNodes()
        const selectedData = selectedNodes.map( node => node.data )
        const selectedDataStringPresentation = selectedData.map( node => node.make + ' ' + node.model).join(', ')
        alert(`Selected nodes: ${selectedDataStringPresentation}`)
     }
    
    
    useEffect(() => {
          fetch('https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/sample-data/rowData.json')
         .then(result => result.json())
          .then(rowData => setRowData(rowData))
     }, []);
      
     
     
     return(
         
        <div className="ag-theme-alpine" style={{ height: 400, width: 600 } }>
            <button onClick={onButtonClick}>Get selected rows</button>
            <AgGridReact
                  
                rowData={rowData} rowSelection="multiple"
                groupSelectsChildren={true}
       autoGroupColumnDef={{
          headerName: "Model",
             field: "model",
           cellRenderer:'agGroupCellRenderer',
           cellRendererParams: {
               checkbox: true
           }
       }}
                     >
                <AgGridColumn field="make" sortable={true} filter={true} checkboxSelection={true}  rowGroup={true}></AgGridColumn>
                <AgGridColumn field="model" sortable={true} filter={true}></AgGridColumn>
                <AgGridColumn field="price" sortable={true} filter={true}></AgGridColumn>
            </AgGridReact>
        </div>
     );
     
     
    }

    

export default App;