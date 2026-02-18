import { Request, Response } from "express";
import { UsuarioService } from "../services/usuario.service";

/**
 * Controller = recebe HTTP (req/res) e chama o service
 * Aqui fazemos: ler params/body e devolver status codes.
 */
const service = new UsuarioService();

export const UsuarioController = {
  // GET /usuarios
  async listar(req: Request, res: Response) {
    try {
      const lista = await service.listar();
      return res.json(lista);
    } catch (err: any) {
      return res.status(500).json({ erro: err.message });
    }
  },

  // GET /usuarios/:id
  async buscar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const user = await service.buscarPorId(id);
      return res.json(user);
    } catch (err: any) {
      return res.status(404).json({ erro: err.message });
    }
  },

  // POST /usuarios
  async criar(req: Request, res: Response) {
    try {
      const { nome, email } = req.body;
      const novo = await service.criar(nome, email);
      return res.status(201).json(novo);
    } catch (err: any) {
      return res.status(400).json({ erro: err.message });
    }
  },

  // PUT /usuarios/:id
  async atualizar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      // Sem DTO: pegamos o body e mandamos como "dados parciais"
      const atualizado = await service.atualizar(id, req.body);
      return res.json(atualizado);
    } catch (err: any) {
      return res.status(400).json({ erro: err.message });
    }
  },

  // DELETE /usuarios/:id
  async remover(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const resp = await service.remover(id);
      return res.json(resp);
    } catch (err: any) {
      return res.status(404).json({ erro: err.message });
    }
  },
};
