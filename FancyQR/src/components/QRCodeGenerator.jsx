import React, { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

// Import images directly
import valentineImg from '../assets/images/themes/valentine.png';
import birthdayImg from '../assets/images/themes/birthday.png';
import xmasImg from '../assets/images/themes/xmas.png';

const QRCodeGenerator = () => {
    const [url, setUrl] = useState('');
    const [theme, setTheme] = useState('default');
    const [themeImage, setThemeImage] = useState(null);

    // Set up the themes with imported images
    const themes = {
        default: null,
        valentine: valentineImg,
        birthday: birthdayImg,
        xmas: xmasImg,
    };

    // Load and verify image when theme changes
    useEffect(() => {
        if (theme !== 'default' && themes[theme]) {
            const img = new Image();
            img.onload = () => {
                console.log('Theme image loaded successfully:', themes[theme]);
                setThemeImage(themes[theme]);
            };
            img.onerror = (e) => {
                console.error('Error loading theme image:', e);
                setThemeImage(null);
            };
            img.src = themes[theme];
        } else {
            setThemeImage(null);
        }
    }, [theme]);

    const handleUrlChange = (e) => setUrl(e.target.value);
    const handleThemeChange = (e) => setTheme(e.target.value);

    const handleDownload = () => {
        // Create high-resolution canvas
        const scale = 4; // Increase this for even higher resolution
        const baseSize = 200;
        const canvas = document.createElement('canvas');
        canvas.width = baseSize * scale;
        canvas.height = baseSize * scale;
        const ctx = canvas.getContext('2d');

        // Enable high-quality image rendering
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        if (themeImage) {
            const img = new Image();
            img.onload = () => {
                // Draw background at high resolution
                ctx.globalAlpha = 100;
                ctx.drawImage(img, 0, 0, baseSize * scale, baseSize * scale);
                ctx.globalAlpha = 1.0;

                // Get the existing QR code canvas and scale it up
                const qrCanvas = document.querySelector('#qr-container canvas');
                const qrSize = 100 * scale;
                const qrPosition = 50 * scale;

                // Draw the QR code at high resolution
                ctx.drawImage(
                    qrCanvas,
                    qrPosition,
                    qrPosition,
                    qrSize,
                    qrSize
                );

                // Create download link with high-quality PNG
                const link = document.createElement('a');
                link.download = 'themed-qr.png';
                link.href = canvas.toDataURL('image/png', 1.0);
                link.click();
            };
            img.src = themeImage;
        } else {
            // For non-themed QR codes
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, baseSize * scale, baseSize * scale);
            
            // Get the existing QR code canvas and scale it up
            const qrCanvas = document.querySelector('#qr-container canvas');
            const qrSize = 100 * scale;
            const qrPosition = 50 * scale;

            // Draw the QR code at high resolution
            ctx.drawImage(
                qrCanvas,
                qrPosition,
                qrPosition,
                qrSize,
                qrSize
            );

            const link = document.createElement('a');
            link.download = 'qr.png';
            link.href = canvas.toDataURL('image/png', 1.0);
            link.click();
        }
    };

    return (
        <div className="card p-4">
            <div className="mb-3">
                <label htmlFor="urlInput" className="form-label">Enter URL:</label>
                <input
                    type="url"
                    id="urlInput"
                    className="form-control"
                    placeholder="https://example.com"
                    value={url}
                    onChange={handleUrlChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="themeSelect" className="form-label">Choose Theme:</label>
                <select
                    id="themeSelect"
                    className="form-select"
                    value={theme}
                    onChange={handleThemeChange}
                >
                    {Object.keys(themes).map((key) => (
                        <option key={key} value={key}>
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                        </option>
                    ))}
                </select>
            </div>
            <div className="text-center">
                {url && (
                    <div 
                        id="qr-container"
                        style={{ 
                            position: 'relative', 
                            display: 'inline-block',
                            width: '200px',
                            height: '200px'
                        }}
                    >
                        {themeImage && (
                            <img
                                src={themeImage}
                                alt="Theme"
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    zIndex: 0,
                                    opacity: 100,
                                }}
                            />
                        )}
                        <QRCodeCanvas
                            value={url}
                            size={100}
                            level="H"
                            style={{
                                position: 'relative',
                                top: 50,
                            }}
                        />
                    </div>
                )}
            </div>
            {url && (
                <div className="text-center">
                    <button onClick={handleDownload} className="btn btn-primary mt-3">
                        Download QR Code
                    </button>
                </div>
            )}
        </div>
    );
};

export default QRCodeGenerator;