import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './grid.css';
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { GridPDFExport } from '@progress/kendo-react-pdf';
import { ExcelExport } from '@progress/kendo-react-excel-export';
import { IntlProvider, load, LocalizationProvider, loadMessages, IntlService } from '@progress/kendo-react-intl';
import likelySubtags from 'cldr-core/supplemental/likelySubtags.json';
import currencyData from 'cldr-core/supplemental/currencyData.json';
import weekData from 'cldr-core/supplemental/weekData.json';
import numbers from 'cldr-numbers-full/main/es/numbers.json';
import currencies from 'cldr-numbers-full/main/es/currencies.json';
import caGregorian from 'cldr-dates-full/main/es/ca-gregorian.json';
import dateFields from 'cldr-dates-full/main/es/dateFields.json';
import timeZoneNames from 'cldr-dates-full/main/es/timeZoneNames.json';
import { DatePicker } from "@progress/kendo-react-dateinputs";
import { FloatingLabel } from "@progress/kendo-react-labels";
import { Input,Checkbox } from "@progress/kendo-react-inputs";
load(likelySubtags, currencyData, weekData, numbers, currencies, caGregorian, dateFields, timeZoneNames);
import {esMessages} from './es.js';
loadMessages(esMessages, 'es-ES');
import { process } from '@progress/kendo-data-query';
import {orders} from './order.js';
const DATE_FORMAT = 'yyyy-mm-dd hh:mm:ss.SSS';
const intl = new IntlService('en');
orders.forEach(o => {
  o.orderDate = intl.parseDate(o.orderDate ? o.orderDate : '20/20/2020', DATE_FORMAT);
  o.shippedDate = o.shippedDate ? undefined : intl.parseDate(o.shippedDate ? o.orderDate.toString() : '20/20/2020', DATE_FORMAT);
});
const DetailComponent = props => {
  const dataItem = props.dataItem;
  return <div
  style={{
    marginLeft:"500px"
  }}>
            <Grid style={{
  
    }} data={dataItem.details} />
          </div>;
};
const Grids = () => {
  const locales = [{
    language: 'All DMV States',
    locale: 'en'
  }, {
    language: 'AZ-MESA',
    locale: 'es'
  }];
  const [dataState, setDataState] = React.useState({
    group: [{
      field: 'User'
    }]
  });
  const [currentLocale, setCurrentLocale] = React.useState(locales[0]);
  const [dataResult, setDataResult] = React.useState(process(orders, dataState));
  const dataStateChange = event => {
    setDataResult(process(orders, event.dataState));
    setDataState(event.dataState);
  };
  const expandChange = event => {
    const isExpanded = event.dataItem.expanded === undefined ? event.dataItem.aggregates : event.dataItem.expanded;
    event.dataItem.expanded = !isExpanded;
    setDataResult({
      ...dataResult
    });
  };
  let _pdfExport;
  const exportExcel = () => {
    _export.save();
  };
  let _export;
  const exportPDF = () => {
    _pdfExport.save();
  };
  const defaultValue = new Date(2000, 2, 10, 13, 30, 0);
  const CustomerId= "Enter Customer";
  const userId = "EnterUserName";
  return <LocalizationProvider language={currentLocale.language}>
            
              <div style={{
                marginLeft:'200px',
                marginTop:"50px"
              }}>
                
                  <Grid style={{
            height: '700px'
          }}  pageable={{
            buttonCount: 4,
            pageSizes: true
          }} data={dataResult} {...dataState} >
                    <GridToolbar  style={{marginBottom:'0px',marginTop:'0px'}}>
                  <b>FromDate</b> : &nbsp;&nbsp;&nbsp;
                 <DatePicker
          format={"dd-MMM-yyyy HH:mm:ss"}
          defaultValue={defaultValue}
          width={200}
        />
                   <b>ToDate</b>: &nbsp;&nbsp;&nbsp;
                 <DatePicker
          format={"dd-MMM-yyyy HH:mm:ss"}
          defaultValue={defaultValue}
          width={200}
        />
             <DropDownList style={{width:'180px'}}value={currentLocale} textField="language" onChange={e => {
                setCurrentLocale(e.target.value);
              }} data={locales} />&nbsp;&nbsp;&nbsp;
                      <DropDownList style={{width:'180px'}} value={currentLocale} textField="language" onChange={e => {
                setCurrentLocale(e.target.value);
              }} data={locales} />&nbsp;&nbsp;&nbsp;
              <FloatingLabel
      label={"Enter Customer"}
    >
      <Input id={CustomerId} style={{width:"220px",marginBottom:"20px"}} />
    </FloatingLabel>
         <FloatingLabel
      label={"Enter UserName"}
    >
      <Input id={userId} style={{width:"220px",marginBottom:"20px"}} />
    </FloatingLabel>
    </GridToolbar>
                <GridToolbar style={{marginBottom:'0px',marginTop:'0px'}} >
                <FloatingLabel
      label={"Enter Tracking Number"}
    >
      <Input id={userId} style={{width:"220px",marginBottom:"20px",marginRight:"1000px",marginTop:'0px'}} />
    </FloatingLabel>
                      <button title="Export to Excel" className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-success" onClick={exportExcel}>
                      <i class="fa fa-search"/>Search
                      </button>&nbsp;
                      <button style={{width:"80px"}}className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-secondary" onClick={exportPDF}>X Clear</button>
                      </GridToolbar>
                      <GridToolbar  style={{marginBottom:'0px',marginTop:'0px'}}>

                      <button style={{width:"160px"}}className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-secondary" onClick={exportPDF}><i class="fa fa-print"/>Print Cover Page</button>
                      </GridToolbar>
              
                    <GridColumn field="Request#" width="100px" />
                    <GridColumn field="SVRSBatch#"   width="100px"/>
                    <GridColumn field="Customer" width="100px" />
                    <GridColumn field="processingLocation" width="100px" />
                    <GridColumn field="DMV"  width="100px" />
                    <GridColumn field="User" width="100px" />
                    <GridColumn field="IncomingTrackingNumber"  width="190px" />
                    <GridColumn field="ShipmentReceivedDate"  width="190px" />
                    <GridColumn field="DocumentCount"  width="90px" />
                    <GridColumn field="SystemScannedCount"  width="190px" />
                    <GridColumn field="Logid"  width="90px" />
                    <GridColumn field="Status"  width="90px" />
                  </Grid>
              
                <GridPDFExport ref={element => {
          _pdfExport = element;
        }} margin="1cm">
                  {/* {<Grid data={process(orders, {
            skip: dataState.skip,
            take: dataState.take
          })}>
                    <GridColumn field="customerID" width="200px" />
                    <GridColumn field="orderDate" filter="date" format="{0:D}" width="300px" className='grid-column' />
                    <GridColumn field="shipName" width="280px" />
                    <GridColumn field="freight" filter="numeric" width="200px" />
                    <GridColumn field="shippedDate" filter="date" format="{0:D}" width="300px" />
                    <GridColumn field="employeeID" filter="numeric" width="200px" />
                    <GridColumn locked={true} field="orderID" filterable={false} title="ID" width="90px" />
                  </Grid>} */}
                </GridPDFExport>
              </div>
            
          </LocalizationProvider>;
};
export default Grids