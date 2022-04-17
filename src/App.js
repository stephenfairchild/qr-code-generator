import {useState} from 'react';

import QRCode from "react-qr-code";

function App() {
  const [ email, setEmail ] = useState("");
  const [ secondaryEmail, setSecondaryEmail ] = useState("");
  const [ showCode, setShowCode ] = useState(false);
  const [ mail, setMail ] = useState(false);
  const [ subject, setSubject ] = useState("");


    function generateCode() {
        let tmpMail = "";

        if (!email) {
            alert("A primary email must be set");
        }

        if (!subject) {
            alert("A subject line is required");
        }

        tmpMail = email;

        if (secondaryEmail) {
            tmpMail = `${tmpMail},${secondaryEmail}`;
        }

        setMail(tmpMail);

        if (showCode) {
            setShowCode(false);
        }
        
        setTimeout(() => {
            setShowCode(true);
        }, 2000)
    }

    function download() {
        const svg = document.getElementById("QRCode");
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          const pngFile = canvas.toDataURL("image/png");
          const downloadLink = document.createElement("a");
          downloadLink.download = "QRCode";
          downloadLink.href = `${pngFile}`;
          downloadLink.click();
        };
        img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    }

  return (
    <div className="App">
        <div>
            <label>
                Email: 
                <input value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
        </div>
        <div>
            <label>
                Secondary Email: 
                <input 
                    value={secondaryEmail} 
                    onChange={(e) => setSecondaryEmail(e.target.value)} />
            </label>
        </div>
        <div>
            <label>
                Subject Line:
                <input 
                    value={subject} 
                    onChange={(e) => setSubject(e.target.value)} />
            </label>
        </div>
        <button onClick={() => generateCode()}>Generate code</button>

        { showCode && 
        <div>
            <div style={{ background: 'white', padding: '16px' }}>
                <QRCode id="QRCode" value={`mailto:${mail}?subject=${subject}`} />
            </div> 
            <button onClick={() => download()}>Download</button>
        </div>
        }
    </div>
  );
}

export default App;
