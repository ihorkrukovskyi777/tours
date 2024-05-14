export function Page410() {
    return `
        <style>
        .container {
            width: 100%;
            padding: 0 20px;
            margin: 0 auto;
            max-width: 1260px;
        }
        .page-404 {
            min-height: calc(100vh - 153px);
            width: 100%;
            clear: both;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        .page-404   h1 {
            font-size: 160px;
            line-height: 1;
            margin: 0;
            color: black;
        }
        .page-404   h4 {
            font-size: 26px;
            text-align: center;
            font-weight: 200;
            margin: 0;
        }
        .page-404 p {
            font-size: 22px;
            color: black
        }
        .page-404 p a {
            color: black;
        }
        .header {
                padding-top: 8px;
                padding-bottom: 8px;
        }
        .flex {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .flex a {
            display: flex;
        }
        .container {
            width: 100%;
        }
        </style>
         <header class="header">
            <div class="container">
                <div class=flex">
                    <a  href="${process.env.NEXT_PUBLIC_CANONICAL_DOMAIN}"/>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" height="48" viewBox="0 0 131 48" width="131">
                            <rect fill="url(#pattern0)" height="48" width="131"/>
                            <defs>
                            <pattern height="1" id="pattern0" patternContentUnits="objectBoundingBox" width="1">
                            <use href="#image0_405_3843" transform="translate(0 -0.000109075) scale(0.0026178 0.00714442)"/>
                            </pattern>
                            <image height="140" href="data:image/png;base64,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" id="image0_405_3843" width="382"/>
                            </defs>
                        </svg>
                    </a>
                </div>
            </div>
            
            <div class="content page-404">
                <h4>Permanently deleted or Gone</h4>
                <h1>Error 410</h1>
                <p>You can go back to the home page <a href="${process.env.NEXT_PUBLIC_CANONICAL_DOMAIN}">HERE</a></p>
            </div>
        </header>
    `
}