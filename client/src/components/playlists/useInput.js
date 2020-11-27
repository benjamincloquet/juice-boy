import { useState, useEffect } from 'react';

export default (validateInput, onSubmit) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [touched, setTouched] = useState(false);

  const onInputChange = (e) => {
    setInput(e.target.value);
    setTouched(true);
  };

  useEffect(() => {
    if (touched) {
      const validationTimeout = setTimeout(async () => {
        setError(await validateInput(input));
      }, 500);

      return () => {
        clearTimeout(validationTimeout);
      };
    }
    return () => {};
  }, [input]);

  const onEnter = async () => {
    const submitError = await validateInput(input);
    setError(submitError);
    if (!submitError) {
      await onSubmit(input);
      setTouched(false);
      setInput('');
    }
  };

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      onEnter();
    }
  };

  return {
    input, error, onInputChange, onEnter, onKeyPress,
  };
};
