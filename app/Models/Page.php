<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Str;

class Page extends Model
{
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'name',
        'linked_page_id'
    ];

    public static function booted() {
        static::creating(function ($model) {
            $model->id = Str::uuid();
        });
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function linkedPage(): HasOne
    {
        return $this->hasOne(Page::class, 'id', 'linked_page_id');
    }

    public function votes(): HasMany
    {
        return $this->hasMany(Vote::class);
    }

    public function bottleMessages(): HasMany
    {
        return $this->hasMany(BottleMessage::class);
    }

    public function lastBottleMessage(): HasOne
    {
        return $this->hasOne(BottleMessage::class)->orderByDesc('created_at');
    }
}
