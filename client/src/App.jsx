import { useState, useRef } from "react"

export default function App() {
  const [url, setUrl] = useState("");
  const[hide, setHide] = useState(true);
  const [shortUrl, setShortUrl] = useState('');
  const inputRef = useRef(null);
  const [copy, setCopy] = useState(false)

  const handleCopy = (e) => {
    e.preventDefault();
    const text = inputRef.current.value;
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopy(true)
        console.log('Text copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  }

  const handleRefresh = () => {
    window.location.reload();
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const res = await fetch('/url/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({url}),
    }) 
    const data = await res.json();
    setShortUrl(data.id);
    setHide(false);
    console.log('Form submitted:', url);
  }
  return (
    <div className='p-3 max-w-lg mx-auto '>
      <h1 className='text-3xl text-center font-semibold my-7 text-black'>URL Shortner</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-15 border p-10 bg-blue-400'>
        <label className="text-black">URL:</label>
        <input 
          type="text" 
          placeholder="Enter URL" 
          className='border p-3 rounded-lg bg-purple-100' 
          id="url" 
          value={url}
          onChange={(e)=>setUrl(e.target.value)}
        />

        {
          !hide && <label>Shortened URL:</label>
        }
        {
          !hide &&<input 
            className="border p-3 rounded-lg bg-purple-50" 
            id="inputField" 
            type="text" 
            placeholder=""
            value={`http://localhost:5173/url/${shortUrl}`}
            ref={inputRef}
            readOnly
          />
        }

        {
          !hide && <div className="flex justify-between mt-7">
                <button onClick={handleCopy} className="border p-3 bg-purple-300">
                  {
                    copy ? <span>Copied</span> : <span>Copy</span>
                  }
                </button>
                <button className="border p-3 bg-purple-300" onClick={handleRefresh} >Short New</button>
              </div>
        }

        {
          hide && <button 
            type="submit"
            className='bg-green-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 mt-10 bg-green-500'>
            Make it short
          </button>
        }
      </form>
    </div>
  )
}

