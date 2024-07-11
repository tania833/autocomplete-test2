import { useQuery } from '@tanstack/react-query'
import { Autocomplete, TextField, Chip } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'

import { fetchAutocompleteOptions } from '../api'
import useStore from '../store'
import { sumDigitsFromString } from '../shared/utils'

import classes from './MainPage.module.css'

const MainPage = () => {
    const setAutocompleteoptions = useStore((state) => state.setOptions)
    const autocompleteOptions = useStore(state => state.autocompleteOptions)

    const { isPending, error, data } = useQuery(fetchAutocompleteOptions)

    const [selectedValues, setSelectedValues] = useState([])

    useEffect(() => {
        if (data) {
            const mappedFilteredOptions = data
                .filter((value, index, array) =>
                    array.findIndex(v => v.id === value.id) === index
                )
            setAutocompleteoptions(mappedFilteredOptions)
        }
    }, [data, setAutocompleteoptions])

    const selectedValuesResult = useMemo(() => {
        let valuesToString = []
        selectedValues.forEach(item => {
            let { value } = item

            if (!value) {
                // const testExp = new RegExp(/[-!$%^*+:><]/)
                // const operand = item.match(testExp)

                // if (operand)
                //     valuesToString.push(operand[0])
                valuesToString.push(0)
            } else {
                valuesToString.push(item.value)
            }
        })
        const sum = valuesToString.reduce((accumulator, currentValue) => {
            return accumulator + currentValue
        }, 0)

        return sum
    }, [selectedValues])

    if (isPending) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    return <div>
        {autocompleteOptions.length && <Autocomplete
            className={classes['main-page-autocomplete']}
            multiple
            options={autocompleteOptions}
            freeSolo
            autoSelect
            sx={{ width: 300 }}
            getOptionLabel={(option) => option.name || option}
            onChange={(event, newValue) => {
                if (!autocompleteOptions.findIndex(item => item.name === newValue)) {
                    if (typeof newValue === 'string') {
                        setAutocompleteoptions({
                            name: newValue,
                        });
                    } else if (newValue && newValue.inputValue) {
                        setAutocompleteoptions({
                            name: newValue.inputValue,
                        });
                    } else {
                        setAutocompleteoptions(newValue);
                    }
                }
                setSelectedValues(newValue)
            }}
            renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                    <Chip
                        key={index}
                        variant="outlined"
                        label={option.name || option}
                        value={option}
                    />
                ))}
            renderInput={(params) => <TextField {...params} label="Options" />}
        />}
        <div className={classes['main-page-result']}>Result: {selectedValuesResult} </div>
    </div>
}

export default MainPage