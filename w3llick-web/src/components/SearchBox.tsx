import { Box, Input } from "@chakra-ui/react"

interface SearchBoxProps {
    ref: React.RefObject<unknown>
}

export const SearchBox: React.FC<SearchBoxProps> = ({ref}) => {
    console.log(ref);

    return ()
}