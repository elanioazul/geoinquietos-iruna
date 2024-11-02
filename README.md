# Geoinquietos iruña

Pilot app about realtime updates for a point mapping vector layer.

## App´s overview:

Points on a map are realtime positioned based on messages delivered by a socket gateaway server.

Points location are persisted in DB as the locationChanged message is listened by subscribers.

## How to test it:

1. Download git repo, this is, front, back & postgres-config folders plus docker-compose file. Env file and postgres dump files also downlable.
2. Lift all services: 
    - docker-compose build 
    - docker-compose up -d
3. Load postgres with dump file (geoinquietos.dump) with something like: psql -h localhost -U postgres -d geoinquietos -p 5433 -f geoinquietos.dump
4. Check postgres is loaded somehow, for instance: 
    - psql -h localhost -U postgres -d geoinquietos -p 5433
    - SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'puntos_flota_municipal_recarga_vehiculos_electricos';
5. Open a socket.io client (p.e. postman has this option). Open two different socket.io postman tabs. 

    * One is going to be the sender (simulating the kafka tailing messages arriving)
    
    * The other, coupled with the frontend app, will be the listeners of the messages arrived realtime. How? Follow this steps:
        - Postman sender tab: Event name: `updateLocation` and message in json format: 
        ```json
            "id": select the id of any of the rows in the DB (one you know where is located in the map and wanna see realtime changing),
            "lon": select the lon in 4326 system projection where you want to update the point location
            "lat": select the lat in 4326 system projection where you want to update the point location,
        ```

        - Postman listener tab: Event name: `locationChanged`

        - Frontend app: its already listening to `locationChanged`. Do nothing with it but looking to the target point of `updateLocation` event.
        
        - Send updateLocation message from postman sender tab
            
6. These steps will update location of the target point throught socket.io.