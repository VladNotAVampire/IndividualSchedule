import React from 'react';
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

const Swagger = () => <SwaggerUI url="http://localhost:7070/api/spec"/>

export default Swagger;