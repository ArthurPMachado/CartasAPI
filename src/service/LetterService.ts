import { Request, Response, NextFunction } from 'express';

function mustBeInteger(request: Request, response: Response, next: NextFunction) {
  const { id } = request.params;

  if (!Number.isInteger(parseInt(id, 10))) {
    response.status(400).json({
      message: 'Id must be an integer, verify and send again',
    });
  } else {
    next();
  }
}

function checkFields(request: Request, response: Response, next: NextFunction) {
  const {
    from, to, title, description,
  } = request.body;

  if (from && to && title && description) {
    next();
  } else {
    response.status(400).json({
      message: 'Some field(s) are empty',
    });
  }
}

export { mustBeInteger, checkFields };
