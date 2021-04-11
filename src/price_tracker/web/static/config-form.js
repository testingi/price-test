const ConfigForm = (config) => {
    const [configValues, setConfigValues] = useState(
      JSON.parse(config.replaceAll("&#39;", '"'))
    );
    const handleRemove = () => {
      request("/config", {}, "DELETE")
        .then((r) => {
          if (r.status === 200) {
            setConfigValues({
              sender_gmail: "",
              gmail_password: "",
              receiver_email: "",
            });
            alert(SUCCESS_MESSAGE);
          } else alert(FAIL_MESSAGE);
        })
        .catch(() => alert(FAIL_MESSAGE));
    };

    const handleOnChange = (e) => {
      setConfigValues({ ...configValues, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
      let isValid = true;
      Object.keys(configValues).forEach((key) => {
        if (configValues[key] === "") isValid = false;
      });
      if (!isValid) {
        alert(EMPTY_FIELD_MESSAGE);
        return;
      }
      request("/config", configValues, "PUT")
        .then((r) => {
          if (r.status === 200) alert(SUCCESS_MESSAGE);
          else alert(FAIL_MESSAGE);
        })
        .catch(() => alert(FAIL_MESSAGE));
    };

    return (
      <React.Fragment>
        <h1>Config</h1>

        <div>
          <label>
            Gmail почта:
            <input
              type="text"
              name="sender_gmail"
              value={configValues.sender_gmail}
              onChange={handleOnChange}
            />
          </label>
        </div>
        <div>
          <label>
            Gmail пароль:
            <input
              type="password"
              name="gmail_password"
              value={configValues.gmail_password}
              onChange={handleOnChange}
            />
          </label>
        </div>
        <div>
          <label>
            Email для получения:
            <input
              type="text"
              name="receiver_email"
              value={configValues.receiver_email}
              onChange={handleOnChange}
            />
          </label>
        </div>
        <div>
          <input type="button" value="Сохранить" onClick={handleSave} />
          <input type="button" value="Удалить" onClick={handleRemove} />
        </div>
      </React.Fragment>
    );
  };