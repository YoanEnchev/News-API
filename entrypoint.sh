if [ ! -d "node_modules" ]; then
    # There is no node_modules folder. So install modules.
    npm install
fi



# Wait a few seconds before showing a message that script finished so it doesn't overlap with other messages.
sleep 3 && 
    echo '..........................................' && pwd && '--'
    echo 'Finished building. Server is up.' &&
    echo '..........................................'

npm run start