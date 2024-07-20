import { useState } from 'react';
import { X } from 'lucide-react';

export default function SeedQualityForm() {
  const [images, setImages] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <form className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Seed Quality</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Upload Images</label>
        <input type="file" multiple onChange={handleImageUpload} />
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {images.map((image, index) => (
          <div key={index} className="relative w-24 h-24 border">
            <img src={URL.createObjectURL(image)} alt="" className="w-full h-full object-cover" />
            <button
              type="button"
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full"
              onClick={() => handleRemoveImage(index)}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      <button type="button" className="bg-green-700 text-white px-4 py-2 rounded">Save</button>
    </form>
  );
}
