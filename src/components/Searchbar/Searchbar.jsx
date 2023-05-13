import { useState } from "react";
import { toast } from 'react-toastify';
import { FormInput, Header, SearchForm, SearchFormBtn, ButtonLabel } from './Searchbar.styled';
import { FcSearch } from 'react-icons/fc';
import PropTypes from 'prop-types';

export default function Searchbar({onSubmit}) {

    const [value, setValue] = useState('');

    const handleChange = e => {
        setValue(e.currentTarget.value);
    };

    const handleSubmit = e => {

        if (value.trim() === '') {
            e.preventDefault();
            toast.error('Введіть назву картинки!');
            return;
        } 
            e.preventDefault();
            onSubmit(value)
            setValue('');
    };

        return (
            <Header>
                <SearchForm
                    onSubmit={handleSubmit}>
                    <SearchFormBtn
                        type="submit">
                        <FcSearch style={{ width: 30, height: 30 }}/>
                        <ButtonLabel>Search</ButtonLabel>
                    </SearchFormBtn>
                    <FormInput
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        value={value}
                        onChange={handleChange}
                    />
                </SearchForm>
            </Header>
        );
};

Searchbar.propTypes = {
            onSubmit: PropTypes.func.isRequired,
};