import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateProductImageService from '@modules/products/services/UpdateProductImageService';

class ProductImageController {
  public async update(req: Request, res: Response): Promise<Response> {
    const updateProductImage = container.resolve(UpdateProductImageService);

    const product = await updateProductImage.execute({
      id: req.params.id,
      imageFilename: req.file.filename,
    });

    return res.json(classToClass(product));
  }
}

export default ProductImageController;
