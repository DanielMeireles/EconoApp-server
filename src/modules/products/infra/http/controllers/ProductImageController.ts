import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateProductImageService from '@modules/products/services/UpdateProductImageService';

class ProductImageController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateProductImage = container.resolve(UpdateProductImageService);

    const product = await updateProductImage.execute({
      id: request.params.id,
      imageFilename: request.file.filename,
    });

    return response.json(classToClass(product));
  }
}

export default ProductImageController;
