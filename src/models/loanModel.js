import { supabase } from "../config/supabaseClient.js";

export const LoanModel = {
  // Read All dengan dukungan Filter Query (misal: ?status=Terlambat)
  async getAll({ status, member_name } = {}) {
    let query = supabase.from("loans").select("*");

    if (status) {
      query = query.eq("status", status);
    }
    if (member_name) {
      query = query.ilike("member_name", `%${member_name}%`);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  // Read By ID
  async getById(id) {
    const { data, error } = await supabase
      .from("loans")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  // Create
  async create(payload) {
    const { data, error } = await supabase
      .from("loans")
      .insert([payload])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update
  async update(id, payload) {
    const { data, error } = await supabase
      .from("loans")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete
  async remove(id) {
    const { error } = await supabase
      .from("loans")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return { message: "Data peminjaman berhasil dihapus" };
  },
};