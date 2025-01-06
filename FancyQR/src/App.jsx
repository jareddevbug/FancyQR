import React from 'react';
import QRCodeGenerator from './components/QRCodeGenerator';

const App = () => {
    return (
      <>

        <div className="container my-12">
            <div className="text-center">
                <h1>QR Code Generator</h1>
                <p>Generate QR codes with custom themes!</p>
            </div>
            <QRCodeGenerator />
        </div>

        {/* <div class="container-fluid">
          <div class="row">
            <div class="col-md-12">
            <div class="alert alert-success">
              <strong>Success!</strong> You should <a href="#" class="alert-link">read this message</a>.
            </div>
            </div>
          </div>
        </div> */}
        </>
    );
};

export default App;
