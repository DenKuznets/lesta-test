import { gql } from "@apollo/client";

export const getShips = gql`
    query GetLocations {
        vehicles {
            title
            description
            icons {
                large
                medium
            }
            level
            type {
                name
                title
                icons {
                    default
                }
            }
            nation {
                name
                title
                color
                icons {
                    small
                    medium
                    large
                }
            }
        }
    }
`;
