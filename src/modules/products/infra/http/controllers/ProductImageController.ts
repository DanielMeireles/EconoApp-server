import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateProductImageService from '@modules/products/services/UpdateProductImageService';

interface IRequest extends Request {
  product_id: string;
}

class ProductImageController {
  public async update(req: IRequest, res: Response): Promise<Response> {
    const updateProductImage = container.resolve(UpdateProductImageService);

    const product = await updateProductImage.execute({
      product_id: req.product_id,
      imageFilename: req.file.filename,
    });

    return res.json(classToClass(product));
  }
}

export default ProductImageController;
