export async function isNewUser(token, issuer){
    const operationsDoc = `query isNewUser($issuer : String!) {
        users(where: {issuer: {_eq: $issuer}})
        {
        id
        email
        issuer
        }
    }`;

    const response = await queryHasuraGQL(operationsDoc, "isNewUser", {issuer}, token);
    console.log({response, issuer})
    return response?.data?.users?.length === 0;
}

export async function createNewUser(token, metaData){
    const operationsDoc = `mutation createNewUser($issuer : String!, $email: String!, $publicAddress: String!) {
        insert_users(objects: {email: $email, issuer: $issuer,
        publicAddress: $publicAddress})
        { returning {
            id
            email
            issuer
            }
        }
    }`;

    const {issuer, email, publicAddress} = metaData;

    const response = await queryHasuraGQL(operationsDoc, "createNewUser", {issuer, email, publicAddress}, token);
    console.log({response, issuer})
    return response;
}

export async function queryHasuraGQL(operationsDoc, operationName, variables, token) {
    const result = await fetch(
        process.env.NEXT_PUBLIC_HASURA_ADMIN_URL,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                query: operationsDoc,
                variables: variables,
                operationName: operationName
            })
        }
    );

    return await result.json();
}
