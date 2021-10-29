import {useEffect, useState} from "react";
import prism from "prismjs";
import sample from './sample.js';

let md = require('markdown-it')()
    .use(require('markdown-it-bracketed-spans'))
    .use(require('markdown-it-attrs'));

let localstorage = window.localStorage;
window.onload = function () {
    let link = document.createElement('link');
    link.setAttribute('id', 'prism');
    link.setAttribute('rel', 'stylesheet');
    document.head.append(link);

    let themeButton = document.getElementById('themeButton');
    let prismJS = document.getElementById('prism');
    if (localstorage.getItem('theme') === 'dark') {
        document.documentElement.className = "dark"
        themeButton.children[0].classList.remove('hidden');
        prismJS.href = 'prism-dark.css';
    } else {
        document.documentElement.className = "light"
        themeButton.children[1].classList.remove('hidden');
        prismJS.href = 'prism.css';
    }
}

function App() {
    useEffect(() => {
        prism.highlightAll();
        textAreaAction();
    });

    const [text, setText] = useState(sample);
    const [words, setWords] = useState(0);

    function textAreaAction() {
        let ref = document.getElementById('rendered');
        setWords(countWords(ref.innerText))
    }

    function countWords(data) {
        const regex = /[\w]+/g;
        return ((data || '').match(regex) || []).length;
    }

    function downloadMD(){
        let textFileAsBlob = new Blob([text], {type:'text/plain'});
        download(textFileAsBlob, 'md');
    }

    function downloadHTML(){
        let textFileAsBlob = new Blob([document.getElementById("rendered").innerHTML], {type:'text/plain'});
        download(textFileAsBlob, 'html');
    }

    function download(blob, ext){
        let downloadLink = document.createElement("a");
        let name = document.getElementById('filename').value;

        downloadLink.download = name + '.'+ ext;
        downloadLink.innerHTML = "Download File";
        if (window.webkitURL != null)
        {
            // Chrome allows the link to be clicked
            // without actually adding it to the DOM.
            downloadLink.href = window.webkitURL.createObjectURL(blob);
        }
        else
        {
            // Firefox requires the link to be added to the DOM
            // before it can be clicked.
            downloadLink.href = window.URL.createObjectURL(blob);
            downloadLink.onclick = () => {downloadLink.remove()};
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);
        }

        downloadLink.click();
    }

    function toggleTheme() {
        let themeButton = document.getElementById('themeButton');
        let prismJS = document.getElementById('prism');
        if (localstorage.getItem('theme') === 'dark') {
            document.documentElement.className = "light"
            themeButton.children[0].classList.add('hidden');
            themeButton.children[1].classList.remove('hidden');
            prismJS.href = 'prism.css';
            localstorage.setItem('theme', 'light');
        } else {
            document.documentElement.className = "dark"
            themeButton.children[0].classList.remove('hidden');
            themeButton.children[1].classList.add('hidden');
            prismJS.href = 'prism-dark.css';
            localstorage.setItem('theme', 'dark');
        }
    }

    return (
        <div className={"h-full min-w-large antialiased relative d-body-bg d-body-text-color root-text"}>
            <header className={"sticky top-0 d-header z-50 backdrop-filter backdrop-blur-md text-gray-800 dark:text-gray-200"}>
                <nav className={"flex items-center justify-between mx-auto px-2 md:px-6 lg:px-8 h-16"}>
                    <a href="/" className="h-12 w-auto flex justify-center items-center">
                        <svg className="h-10 w-auto" viewBox="0 0 438 227" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path className="text-gray-800 dark:text-gray-200 fill-current"
                                  d="M168.168 165.152C162.12 165.152 157.752 163.424 155.064 159.968C152.472 156.512 151.176 150.944 151.176 143.264C151.176 137.6 151.752 133.136 152.904 129.872C154.056 126.608 155.928 124.256 158.52 122.816C161.208 121.376 164.904 120.656 169.608 120.656C173.256 120.656 178.344 120.848 184.872 121.232V117.632C184.872 112.928 184.488 109.568 183.72 107.552C183.048 105.536 181.8 104.24 179.976 103.664C178.248 103.088 175.32 102.8 171.192 102.8C167.064 102.8 161.544 103.184 154.632 103.952V91.712C161.352 90.176 168.36 89.408 175.656 89.408C182.568 89.408 187.752 90.32 191.208 92.144C194.76 93.968 197.16 96.944 198.408 101.072C199.752 105.104 200.424 110.912 200.424 118.496V164H186.024L185.448 154.928H184.584C182.28 161.744 176.808 165.152 168.168 165.152ZM174.936 151.04C176.76 151.04 178.296 150.848 179.544 150.464C180.792 150.08 181.896 149.312 182.856 148.16C184.2 146.336 184.872 142.304 184.872 136.064V132.176H174.072C171.96 132.176 170.376 132.416 169.32 132.896C168.36 133.376 167.64 134.288 167.16 135.632C166.776 136.976 166.584 139.04 166.584 141.824C166.584 145.568 167.112 148.064 168.168 149.312C169.224 150.464 171.48 151.04 174.936 151.04ZM215.382 90.56H229.638L230.214 103.088H231.222C232.662 97.904 234.774 94.352 237.558 92.432C240.438 90.416 244.182 89.408 248.79 89.408V105.968C244.374 105.968 240.87 106.736 238.278 108.272C235.686 109.808 233.814 112.304 232.662 115.76C231.51 119.216 230.934 124.016 230.934 130.16V164H215.382V90.56ZM281.587 192.8C278.131 192.8 274.579 192.656 270.931 192.368C267.379 192.08 264.451 191.744 262.147 191.36V178.832C267.907 179.024 273.235 179.12 278.131 179.12C282.835 179.12 286.147 178.64 288.067 177.68C290.083 176.72 291.331 174.944 291.811 172.352C292.387 169.856 292.675 165.536 292.675 159.392V154.64H291.667C289.651 161.072 284.371 164.288 275.827 164.288C270.643 164.288 266.803 163.232 264.307 161.12C261.907 159.008 260.323 155.84 259.555 151.616C258.883 147.392 258.547 141.248 258.547 133.184V90.56H274.099V130.448C274.099 137.072 274.243 141.68 274.531 144.272C274.915 146.768 275.683 148.4 276.835 149.168C277.987 149.84 280.003 150.176 282.883 150.176C285.955 150.176 288.163 149.552 289.507 148.304C290.947 147.056 291.811 145.04 292.099 142.256C292.483 139.472 292.675 134.864 292.675 128.432V90.56H308.227V154.784C308.227 164.768 307.651 172.304 306.499 177.392C305.443 182.48 303.043 186.32 299.299 188.912C295.555 191.504 289.651 192.8 281.587 192.8ZM357.651 164L346.419 138.656H345.411L333.891 164H317.907L336.051 126.704L318.339 90.56H335.043L345.987 114.608H346.851L357.651 90.56H373.779L356.211 126.704L374.355 164H357.651ZM406.061 165.152C398.093 165.152 392.333 164.096 388.781 161.984C385.229 159.872 382.925 156.32 381.869 151.328C380.909 146.336 380.429 138.32 380.429 127.28C380.429 116.144 380.909 108.08 381.869 103.088C382.925 98.096 385.229 94.592 388.781 92.576C392.333 90.464 398.093 89.408 406.061 89.408C414.029 89.408 419.789 90.464 423.341 92.576C426.893 94.592 429.149 98.096 430.109 103.088C431.165 108.08 431.693 116.144 431.693 127.28C431.693 138.32 431.165 146.336 430.109 151.328C429.149 156.32 426.893 159.872 423.341 161.984C419.789 164.096 414.029 165.152 406.061 165.152ZM406.061 151.76C409.517 151.76 411.869 151.28 413.117 150.32C414.461 149.264 415.277 147.2 415.565 144.128C415.949 141.056 416.141 135.44 416.141 127.28C416.141 119.024 415.949 113.408 415.565 110.432C415.277 107.36 414.461 105.344 413.117 104.384C411.869 103.328 409.517 102.8 406.061 102.8C402.605 102.8 400.205 103.328 398.861 104.384C397.613 105.344 396.797 107.36 396.413 110.432C396.125 113.408 395.98 119.024 395.98 127.28C395.98 135.44 396.125 141.056 396.413 144.128C396.797 147.2 397.613 149.264 398.861 150.32C400.205 151.28 402.605 151.76 406.061 151.76Z"/>
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M0 164V32H132V164H79.0992L72.0458 137.399H52.9008L45.3435 164H26.1985L53.9084 64.1217H70.5343L94.2137 147.437H114.87V49.5665H17.1298V164H0ZM55.9237 119.833H68.5191L61.9695 99.7567L55.9237 119.833Z"
                                  fill="#AE0000"/>
                        </svg>
                    </a>

                    <div className={"flex gap-x-2 items-center"}>
                        <label className={"opacity-50"} htmlFor="filename">File: </label>
                        <input id={"filename"} className={"px-2 py-1 bg-transparent border border-siteLite dark:border-gray-400 rounded"} type="text" defaultValue={"document"}/>

                        <button className={"ml-4"} onClick={downloadMD}>
                            <svg className={"h-6 w-auto opacity-80 hover:opacity-100 transform transition-opacity duration-300"} viewBox="0 0 495 256" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect className={"text-gray-300 dark:text-gray-600 fill-current"} width="495" height="256" rx="26" />
                                <path className={"text-site dark:text-white fill-current"} d="M102.216 143.702V72H123.756V143.702L148.075 119.571L162.667 134.05L113.333 183L64 134.05L78.5915 119.571L102.216 143.702Z" />
                                <path className={"text-site dark:text-white fill-current"} d="M291.236 183V110.146L262.795 164.396H250.762L222.321 110.146V183H200.756V72H223.884L256.7 135.161L289.829 72H312.801V183H291.236Z" />
                                <path className={"text-site dark:text-white fill-current"} d="M335.966 183V72H376.283C388.368 72 398.474 74.5014 406.6 79.5042C414.726 84.4028 420.82 91.0732 424.883 99.5155C428.946 107.854 430.978 117.13 430.978 127.344C430.978 138.6 428.738 148.397 424.258 156.735C419.778 165.073 413.423 171.535 405.193 176.121C396.963 180.707 387.326 183 376.283 183H335.966ZM409.256 127.344C409.256 120.152 407.954 113.846 405.35 108.427C402.745 102.903 398.995 98.6296 394.098 95.607C389.202 92.4803 383.263 90.9169 376.283 90.9169H357.531V164.083H376.283C383.368 164.083 389.358 162.52 394.254 159.393C399.151 156.162 402.849 151.785 405.35 146.261C407.954 140.632 409.256 134.327 409.256 127.344Z" />
                            </svg>
                        </button>

                        <button onClick={downloadHTML}>
                            <svg className={"h-6 w-auto opacity-80 hover:opacity-100 transform transition-opacity duration-300"} viewBox="0 0 700 256" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect className={"text-gray-300 dark:text-gray-600 fill-current"} width="700" height="256" rx="26" />
                                <path className={"text-site dark:text-white fill-current"} d="M107.216 143.702V72H128.756V143.702L153.075 119.571L167.667 134.05L118.333 183L69 134.05L83.5915 119.571L107.216 143.702Z" />
                                <path className={"text-site dark:text-white fill-current"} d="M298.957 72V183H277.625V135.63H227.488V183H206V72H227.488V116.869H277.625V72H298.957Z" />
                                <path className={"text-site dark:text-white fill-current"} d="M404.7 90.9169H369.354V183H348.023V90.9169H312.677V72H404.7V90.9169Z" />
                                <path className={"text-site dark:text-white fill-current"} d="M508.578 183V110.146L480.239 164.396H468.25L439.911 110.146V183H418.424V72H441.469L474.167 135.161L507.177 72H530.066V183H508.578Z" />
                                <path className={"text-site dark:text-white fill-current"} d="M553.147 183V72H574.634V164.083H631V183H553.147Z" />
                            </svg>
                        </button>
                    </div>

                    <div className={"flex gap-x-4 items-center"}>
                        <p className={"text-gray-400 dark:text-gray-500"}><span id={"wordsCount"} className={"text-site dark:text-white"}>{words}</span> Words</p>
                        <p className={"text-gray-400 dark:text-gray-500"}><span id={"readTime"} className={"text-site dark:text-white"}>{Math.floor(words/200)}</span> Minutes Read</p>
                        <button id="themeButton" aria-label="themeButton" className="h-12 w-12 flex justify-center items-center" onClick={toggleTheme}>
                            <svg className="hidden w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 16.1529C19.1593 16.9855 17.1086 17.2374 15.1211 16.8751C13.1336 16.5128 11.3036 15.5535 9.87509 14.1249C8.44655 12.6964 7.48723 10.8665 7.12493 8.87894C6.76263 6.89144 7.01455 4.84072 7.84714 3C6.38172 3.66225 5.09883 4.67013 4.10854 5.93716C3.11824 7.2042 2.45011 8.69256 2.16146 10.2746C1.87281 11.8566 1.97225 13.485 2.45126 15.0201C2.93028 16.5552 3.77456 17.9512 4.91167 19.0883C6.04878 20.2254 7.44478 21.0697 8.9799 21.5487C10.515 22.0277 12.1434 22.1272 13.7254 21.8385C15.3074 21.5499 16.7958 20.8818 18.0628 19.8915C19.3299 18.9012 20.3377 17.6183 21 16.1529Z" fill="currentColor"/>
                            </svg>
                            <svg className="hidden w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C12.3315 2 12.6495 2.1317 12.8839 2.36612C13.1183 2.60054 13.25 2.91848 13.25 3.25V4.5C13.25 4.83152 13.1183 5.14946 12.8839 5.38388C12.6495 5.6183 12.3315 5.75 12 5.75C11.6685 5.75 11.3505 5.6183 11.1161 5.38388C10.8817 5.14946 10.75 4.83152 10.75 4.5V3.25C10.75 2.91848 10.8817 2.60054 11.1161 2.36612C11.3505 2.1317 11.6685 2 12 2V2ZM17 12C17 13.3261 16.4732 14.5979 15.5355 15.5355C14.5979 16.4732 13.3261 17 12 17C10.6739 17 9.40215 16.4732 8.46447 15.5355C7.52678 14.5979 7 13.3261 7 12C7 10.6739 7.52678 9.40215 8.46447 8.46447C9.40215 7.52678 10.6739 7 12 7C13.3261 7 14.5979 7.52678 15.5355 8.46447C16.4732 9.40215 17 10.6739 17 12V12ZM16.42 18.1875L17.3038 19.0712C17.5395 19.2989 17.8553 19.4249 18.183 19.4221C18.5107 19.4192 18.8243 19.2878 19.056 19.056C19.2878 18.8243 19.4192 18.5107 19.4221 18.183C19.4249 17.8553 19.2989 17.5395 19.0712 17.3038L18.1875 16.42C17.9517 16.1923 17.636 16.0663 17.3082 16.0692C16.9805 16.072 16.667 16.2035 16.4352 16.4352C16.2035 16.667 16.072 16.9805 16.0692 17.3082C16.0663 17.636 16.1923 17.9517 16.42 18.1875V18.1875ZM19.07 4.92875C19.3043 5.16316 19.436 5.48105 19.436 5.8125C19.436 6.14396 19.3043 6.46184 19.07 6.69625L18.1875 7.58C18.0722 7.69939 17.9343 7.79462 17.7818 7.86013C17.6293 7.92564 17.4652 7.96012 17.2993 7.96156C17.1333 7.96301 16.9687 7.93138 16.8151 7.86853C16.6614 7.80568 16.5219 7.71286 16.4045 7.59549C16.2871 7.47813 16.1943 7.33856 16.1315 7.18494C16.0686 7.03132 16.037 6.86672 16.0384 6.70075C16.0399 6.53477 16.0744 6.37075 16.1399 6.21824C16.2054 6.06574 16.3006 5.92781 16.42 5.8125L17.3038 4.92875C17.5382 4.69441 17.856 4.56277 18.1875 4.56277C18.519 4.56277 18.8368 4.69441 19.0712 4.92875H19.07ZM20.75 13.25C21.0815 13.25 21.3995 13.1183 21.6339 12.8839C21.8683 12.6495 22 12.3315 22 12C22 11.6685 21.8683 11.3505 21.6339 11.1161C21.3995 10.8817 21.0815 10.75 20.75 10.75H19.5C19.1685 10.75 18.8505 10.8817 18.6161 11.1161C18.3817 11.3505 18.25 11.6685 18.25 12C18.25 12.3315 18.3817 12.6495 18.6161 12.8839C18.8505 13.1183 19.1685 13.25 19.5 13.25H20.75ZM12 18.25C12.3315 18.25 12.6495 18.3817 12.8839 18.6161C13.1183 18.8505 13.25 19.1685 13.25 19.5V20.75C13.25 21.0815 13.1183 21.3995 12.8839 21.6339C12.6495 21.8683 12.3315 22 12 22C11.6685 22 11.3505 21.8683 11.1161 21.6339C10.8817 21.3995 10.75 21.0815 10.75 20.75V19.5C10.75 19.1685 10.8817 18.8505 11.1161 18.6161C11.3505 18.3817 11.6685 18.25 12 18.25V18.25ZM5.8125 7.58C5.92856 7.69614 6.06635 7.78828 6.21802 7.85116C6.36968 7.91405 6.53225 7.94645 6.69643 7.9465C6.86062 7.94656 7.02321 7.91428 7.17492 7.8515C7.32663 7.78872 7.46449 7.69668 7.58062 7.58062C7.69676 7.46457 7.7889 7.32678 7.85179 7.17511C7.91467 7.02344 7.94707 6.86088 7.94713 6.69669C7.94719 6.53251 7.91491 6.36992 7.85213 6.21821C7.78935 6.0665 7.69731 5.92864 7.58125 5.8125L6.69625 4.92875C6.4605 4.70105 6.14474 4.57506 5.817 4.57791C5.48925 4.58076 5.17574 4.71222 4.94398 4.94398C4.71222 5.17574 4.58076 5.48925 4.57791 5.817C4.57506 6.14474 4.70105 6.4605 4.92875 6.69625L5.8125 7.58V7.58ZM7.58 18.1875L6.69625 19.0712C6.4605 19.2989 6.14474 19.4249 5.817 19.4221C5.48925 19.4192 5.17574 19.2878 4.94398 19.056C4.71222 18.8243 4.58076 18.5107 4.57791 18.183C4.57506 17.8553 4.70105 17.5395 4.92875 17.3038L5.8125 16.42C6.04825 16.1923 6.36401 16.0663 6.69175 16.0692C7.0195 16.072 7.33301 16.2035 7.56477 16.4352C7.79653 16.667 7.92799 16.9805 7.93084 17.3082C7.93369 17.636 7.8077 17.9517 7.58 18.1875V18.1875ZM4.5 13.25C4.83152 13.25 5.14946 13.1183 5.38388 12.8839C5.6183 12.6495 5.75 12.3315 5.75 12C5.75 11.6685 5.6183 11.3505 5.38388 11.1161C5.14946 10.8817 4.83152 10.75 4.5 10.75H3.25C2.91848 10.75 2.60054 10.8817 2.36612 11.1161C2.1317 11.3505 2 11.6685 2 12C2 12.3315 2.1317 12.6495 2.36612 12.8839C2.60054 13.1183 2.91848 13.25 3.25 13.25H4.5Z" fill="currentColor"/>
                            </svg>
                        </button>
                    </div>
                </nav>
            </header>

            <div id={"sxs"} className={"h-full flex gap-x-6 px-8"}>
                <textarea id={"textArea"} spellCheck={"true"} className={"h-full resize-none dm-mono w-1/2 bg-gray-200 dark:bg-siteLite bg-opacity-40 dark:bg-opacity-30 border-none outline-none rounded-lg p-4 overflow-y-auto d-scrollbar scrollbar-thin scrollbar-thumb-rounded"} onChange={(e) => { setText(e.target.value); textAreaAction(); }} onPaste={(e) => { setTimeout(()=> { textAreaAction() }, 500) }} onKeyUp={(e)=> { if((e.keyCode === 8) || (e.keyCode === 46)) { textAreaAction(); } }} value={text} />

                <div id={"rendered"} className={"f-full w-1/2 p-4 overflow-y-auto d-scrollbar scrollbar-thin scrollbar-thumb-rounded"} dangerouslySetInnerHTML={{__html:md.render(text)}} />
            </div>
        </div>
    );
}

export default App;
