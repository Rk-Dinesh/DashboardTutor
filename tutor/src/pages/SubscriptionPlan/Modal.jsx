import React from "react";

const Modal = ({ show, onClose, plan, onSave }) => {
  const [formData, setFormData] = React.useState({
    plan_id: plan?.plan_id || "",
    plan_name: plan?.plan_name || "",
    plancost: plan?.plancost || "",
    count: plan?.count || "",
  });

  React.useEffect(() => {
    setFormData({
      plan_id: plan?.plan_id || "",
      plan_name: plan?.plan_name || "",
      plancost: plan?.plancost || "",
      count: plan?.count || "",
    });
  }, [plan]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-36 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="bg-transparent">
          <form className="space-y-3" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="plan_name" className="capitalize form-label">
                <b>Plan Name </b>
              </label>
              <input
                type="text"
                name="plan_name"
                className="form-control py-2"
                id="plan_name"
                placeholder="plan_name"
                value={formData.plan_name}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="plancost" className="capitalize form-label">
                <b>Plan Cost </b>
              </label>
              <input
                type="text"
                name="plancost"
                className="form-control py-2"
                id="plancost"
                placeholder="plancost"
                value={formData.plancost}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="count" className="capitalize form-label">
                <b>Credits </b>
              </label>
              <input
                type="text"
                name="count"
                className="form-control py-2"
                id="count"
                placeholder="Credit"
                value={formData.count}
                onChange={handleInputChange}
              />
            </div>

            <div className="ltr:text-right rtl:text-left">
              <button className="btn btn-danger text-center" onClick={onClose}>
                Cancel
              </button>
              &nbsp; &nbsp;
              <button className="btn btn-dark text-center" type="submit">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
