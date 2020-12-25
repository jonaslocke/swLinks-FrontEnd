## SW LINKS 
### https://sw-links-front-end.vercel.app/

//TODO:
- [ ] Refactory app structure, usecontext hook - https://www.youtube.com/watch?v=lhMKvyLRWo0 

- [x] Create database | Strapi

* Create tables
    - [x] 'Names'
    - [x] 'Surnames'
    - [x] 'Users'
    - [x] 'Matches' | relationship with Users 1 - 1
        1. id -> self generated
        2. userId -> int || relationship with **Users**
        3. handPlayer -> json
        4. handAi -> json
        5. turns -> integer || range 1 - 4
        6. playerLife -> integer
        7. aiLife -> integer
        8. result -> string || list: win, tie, lose
        9. firstStrike -> string || list: player, ai
        9. firstStrike -> string || list: player, ai