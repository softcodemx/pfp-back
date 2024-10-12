import { Controller, Get, Post, Body, Patch, Param, Delete,
  Query, HttpException, HttpStatus } from '@nestjs/common';

// DTO's
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

// Services
import { RestaurantsService } from './restaurants.service';

//New dependencies imported to handle file uploads
import { UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';


@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Post()
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantsService.create(createRestaurantDto);
  }

  @Get()
  findAll(
    @Query('take') take?: number,
    @Query('skip') skip?: number,
    @Query('search') search?: string,
    @Query('orderBy') orderBy?: 'asc' | 'desc'
  ) {
    const or = search
      ? {
          OR: [
            { name: { contains: search } },
            { gps: { contains: search } },
            { is_pet_frendly: { equals: search === "true" } },
          ],
        }
      : undefined;

    return this.restaurantsService.findAll({
      skip: skip || undefined,
      take: take || undefined,
      where: { ...or, deletedAt: null },
      orderBy: {
        id_restaurant: orderBy ? orderBy : 'desc',
      },
    });
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.restaurantsService.findOne({id_restaurant: id});
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateRestaurantDto: UpdateRestaurantDto) {
    return this.restaurantsService.update({
      where: { id_restaurant: id },
      data: {
        ...updateRestaurantDto,
      }
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const restaurantId = parseInt(id, 10);  // Convertimos el ID a número
  
    if (isNaN(restaurantId)) {
      throw new HttpException('Invalid ID format', HttpStatus.BAD_REQUEST);
    }
  
    return this.restaurantsService.remove({
      id_restaurant: restaurantId,
    });
  }

  @Patch(':id/upload-photo') // Define una ruta POST que acepta un ID de restaurante para subir una foto.
@UseInterceptors( // Aplica uno o más interceptores al método.
  FileInterceptor('photo', { // Utiliza el interceptor de archivos para manejar la carga de archivos, específicamente el campo 'photo'.
    storage: diskStorage({ // Define la estrategia de almacenamiento utilizando el sistema de archivos.
      destination: './uploads/restaurants', // Establece el directorio donde se almacenarán las imágenes subidas.
      filename: (req, file, callback) => { // Función que personaliza el nombre del archivo subido.
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9); // Crea un sufijo único usando la fecha actual y un número aleatorio.
        const ext = extname(file.originalname); // Obtiene la extensión original del archivo subido.
        const filename = `${file.fieldname}-${uniqueSuffix}${ext}`; // Crea el nombre final del archivo utilizando el campo, el sufijo único y la extensión.
        callback(null, filename); // Llama al callback con el nombre del archivo, indicando que no hubo errores.
      },
    }),
    fileFilter: (req, file, callback) => { // Función para filtrar los archivos permitidos.
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) { // Verifica si el archivo tiene una extensión válida (jpg, jpeg o png).
        return callback(new Error('Only image files are allowed!'), false); // Si no es válido, llama al callback con un error y false.
      }
      callback(null, true); // Si es válido, llama al callback sin error y con true para permitir la carga.
    },
  }),
)
async uploadPhoto(@UploadedFile() file: Express.Multer.File) { // Método asincrónico que maneja la carga del archivo.
  // Aquí puedes implementar la lógica para vincular la foto al restaurante.
  // Por ejemplo, puedes guardar el path de la foto en la base de datos.
  return {
    message: 'Photo uploaded successfully!', // Mensaje de éxito.
    filePath: `/uploads/restaurants/${file.filename}`, // Ruta de acceso al archivo que fue subido.
  };
}

  
}
