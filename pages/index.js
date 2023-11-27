import { useState } from 'react';

function Home() {
  const [inputValue, setInputValue] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const basePromptStart = "una pintura en la que la gente esta vestida de ";
  const basePromptEnd = " por Paul Gauguin";
  const [prompt, setPrompt] = useState('');

  const handleSubmit = async (event) => {
    setPrompt(basePromptStart + inputValue + basePromptEnd);
    event.preventDefault();
    setLoading(true);

    const response = await fetch('/api/stablediffusion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ value: prompt }),
    });

    if (response.ok) {
      const data = await response.json();
      setImageUrl(data[0]);
    } else {
      console.error('Error:', response.statusText);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-0 flex flex-col sm:py-5">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-[#5d00ff] via-[#bf00ff] to-[#ff0044] shadow-lg transform sm:rounded-3xl"></div>
        <div className="relative px-4 py-0 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full px-5 py-3 text-gray-700 bg-gray-200 rounded"
              placeholder="Enter a description..."
            />
            <button type="submit" className="w-full px-3 py-4 text-white bg-gradient-to-r from-[#5d00ff] via-[#bf00ff] to-[#ff0044] rounded-md focus:outline-none" disabled={loading}>
              Help Paul Gauguin!
            </button>
          </form>
        </div>
      </div>
      {loading && (
        <div className="mt-12 flex justify-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
        </div>
      )}
      {imageUrl && !loading && (
        <div className="mt-12 flex justify-center">
          <img src={imageUrl} alt="Generated image" className="rounded-xl shadow-lg" />
        </div>
      )}
      <style jsx>{`
        .loader {
          animation: spin 1s linear infinite;
          border-top-color: #3498db;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

export default Home;
