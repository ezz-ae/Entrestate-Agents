import { supabase } from '@/lib/supabase';

export async function getUserAgents(userId: string) {
  const { data, error } = await supabase
    .from('Agent')
    .select('*')
    .eq('userId', userId);
  
  if (error) throw error;
  return data;
}

export async function updateAgentStatus(agentId: string, status: 'idle' | 'active' | 'paused') {
  const { data, error } = await supabase
    .from('Agent')
    .update({ status })
    .eq('id', agentId);

  if (error) throw error;
  return data;
}

export async function getCampaignStats(campaignId: string) {
  const { data, error } = await supabase
    .from('Campaign')
    .select('*, leads(*)')
    .eq('id', campaignId)
    .single();

  if (error) throw error;
  return data;
}
