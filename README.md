# Instant App Setup Guide


1. Create .env file in the root

```VITE_INSTANT_APP_ID=appId```


2. Install

```npx instant-cli@latest```

3. Push Schema
```npx instant-cli@latest push schema```

4. Run

```npm run dev```

Hurray!!


## Challenges Faced

1. Integrating with IndexedDb

    

## Usage of React Features and Tools

1. Used useContext to make the selected contact and auth states globally available.
2. Used useReducer for simply managing the authentication states.
3. Used custom hook useCrud to sendMessage and create user for auth.
4. Used useMemo for memoizing the query of fetching the message conversation.


## Design

1. Tried to keep design minimalistic and aesthetic.


