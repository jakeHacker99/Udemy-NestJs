
import { MessagesService } from './messages.services';
import { CreateMessageDto } from './dtos/create-message.dto';
import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';



@Controller('messages')
export class MessagesController {
    constructor(public messagesService: MessagesService) { }

    @Get()
    listMessages() {
        return this.messagesService.findAll()
    }

    @Post()
    createMessage(@Body() body: CreateMessageDto) {
        return this.messagesService.create(body.content)
    }

    @Get('/:id')
    async getMessage(@Param("id") id: string) {
        const message = await this.messagesService.findOne(id)

        if (!message) {
            throw new NotFoundException("Message is missing! 🥕");

        }
        return message


    }
}
