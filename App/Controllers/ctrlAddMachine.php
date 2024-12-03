<?php

namespace App\Controllers;

use \Emeset\Contracts\Http\Request;
use \Emeset\Contracts\Http\Response;
use \Emeset\Contracts\Container;

class MachineController
{

    function createMachine($request, $response, $container)
    {


        $name = $request->get(INPUT_POST, 'name');
        $model = $request->get(INPUT_POST, 'model');
        $manufacturer = $request->get(INPUT_POST, 'manufacturer');
        $location = $request->get(INPUT_POST, 'location');
        $installation_date = $request->get(INPUT_POST, 'installation_date');
        $serial_number = $request->get(INPUT_POST, 'serial_number');
        $photo = $request->get(INPUT_POST, 'photo');
        $coordinates = $request->get(INPUT_POST, 'coordinates');
        
        $photo = null;

        if (isset($_FILES['photo']) && $_FILES['photo']['error'] == 0) {
            $photo = $_FILES['photo']['name'];
            move_uploaded_file($_FILES['photo']['tmp_name'], __DIR__ . "/../../public/Images/" . $photo);
        }
        $machineModel = $container->get("Machine");
        $result = $machineModel->insertMachine($name, $model, $manufacturer, $location, $installation_date, $serial_number, $photo, $coordinates);


        $response->redirect("Location: /machineinv");
        return $response;
    }

}
