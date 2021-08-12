import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
    @Get()
    getRoute() {
        return "glider med 2haragaspåensodiak";
    }
    @Get("tja")
    getByThere() {
        return "tja, läget?"
    }
}
