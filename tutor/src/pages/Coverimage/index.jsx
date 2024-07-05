import React, { useState, useEffect, useRef } from "react";
import Card from "../../components/ui/Card";
import axios from "axios";
import { API } from "../../host";
import { Icon } from "@iconify/react";

const Cover = ({ Current_user }) => {
  const [formData, setFormData] = useState({
    image: null,
  });

  const [banner, setBanner] = useState([]);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const Banner = await axios.get(`${API}/getbanner`);
      const BannerData = Banner.data;
      setBanner(BannerData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (event) => {
    if (event.target.name === "image") {
      setFormData({ ...formData, image: event.target.files[0] });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (banner.length >= 5) {
      setError("Limit exceed!");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("image", formData.image);

    try {
      await axios.post(`${API}/banner`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setFormData({ image: null });
      fileInputRef.current.value = null;
      fetchData();
      setError(null);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (banner_id) => {
    try {
      await axios.delete(`${API}/deletebanner?banner_id=${banner_id}`);

      setBanner((prevBanner) =>
        prevBanner.filter((banner) => banner.banner_id !== banner_id)
      );
    } catch (error) {
      console.error("Error deleting Banner:", error);
    }
  };

  return (
    <div>
      {Current_user === "superadmin" && (
        <Card>
          <div className="bg-transparent">
            <form
              className="space-y-3 flex gap-3 items-end mb-1"
              onSubmit={handleSubmit}
            >
              <div className="w-3/4">
                <label htmlFor="image" className="capitalize form-label ">
                  <b>Banner Image</b>
                </label>
                <input
                  type="file"
                  name="image"
                  className="form-control py-2"
                  id="image"
                  accept=".jpg, .jpeg, .png"
                  onChange={handleInputChange}
                  ref={fileInputRef}
                />
              </div>

              <button
                className="bg-dark text-white py-1.5 px-4 text-base rounded"
                type="submit"
                disabled={banner.length >= 5}
              >
                Save
              </button>
            </form>
            {error && <div className="text-red-500 mt-2">{error}</div>}

            {banner.length >= 5 && (
              <p className="text-center mt-3 text-xl  text-red-600 font-extralight mb-1">
                Adding banner limit exceeds !!!
              </p>
            )}
          </div>
        </Card>
      )}
      <div className="mt-3 grid grid-cols-12 gap-2">
        {banner.map((banners, index) => (
          <div className="col-span-4" key={index}>
            <Card>
              <img
                src={`${API}/${banners.image}`}
                alt="Image"
                className="w-full h-full object-contain relative"
              />
              {Current_user === 'superadmin' && (
              <div
                style={{ position: "absolute", bottom: "10px", right: "20px" }}
              >
                <button
                  onClick={() => handleDelete(banners.banner_id)}
                  className="bg-slate-100 text-slate-400 p-2.5 mb-1.5 rounded-full hover:bg-red-200 hover:text-red-600"
                >
                  <Icon
                    icon="heroicons:trash"
                    className="text-slate-400 dark:text-slate-400 hover:text-danger-600 dark:hover:text-danger-600"
                  />
                </button>
              </div>
              )}
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cover;
