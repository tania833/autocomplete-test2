import { ENDPOINT } from "../shared/constants";

export const fetchAutocompleteOptions = {
    queryKey: ['repoData'],
    queryFn: () =>
        fetch(ENDPOINT).then((res) => res.json())
};