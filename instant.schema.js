
import {i} from "@instantdb/core"

const schema = i.schema({
  entities: {
    contacts: i.entity({
      date_created: i.string(),
      email: i.string().unique(),
      password: i.string(),
      name: i.string(),
    }),
    messages: i.entity({
      date_created: i.string(),
      message: i.string(),
      rid: i.string(),
      sid: i.string(),
    }),
  },
});

export default schema;
